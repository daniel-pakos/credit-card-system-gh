import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { addCardPostSchema } from "./schemas.js";
import { CreditCard } from "../../resources/credit-card.js";

/**
 * TODO: Centralize types
 */
type AddCardPostBodyRequest = FastifyRequest<{
  Body: {
    name: string;
    number: number;
    limit: number;
  };
}>;

const apiRoutes = async (fast: FastifyInstance) => {
  /**
   * Tmp handler for storring card data in cache
   * @param {object} card - card data to save
   * @returns result of saving to DB
   */
  const saveCardToCache = async (card: CreditCard) => {
    const dbName = fast.config(`DB_CARDS_NAME`);
    let allCards = {};
    const newCard = {
      [card.id]: card.json(),
    };

    const savedCards = await fast.redis.get(dbName);

    if (savedCards) {
      allCards = JSON.parse(savedCards);

      if (allCards[card.id]) {
        throw new Error(`Card already exists.`);
      }
    }

    allCards = { ...allCards, ...newCard };

    // save to provisional db
    const isSaved = await fast.redis.set(dbName, JSON.stringify(allCards));

    return isSaved;
  };

  /**
   * Define "/card" POST request
   */
  fast.post("/", {
    schema: addCardPostSchema,
    handler: async (req: AddCardPostBodyRequest, reply: FastifyReply) => {
      // extract card data from POST request
      const { name, number, limit } = req.body;

      try {
        // create new card object
        const creditCart = new CreditCard({ name, number, limit });

        // save  card to cache
        await saveCardToCache(creditCart);
      } catch (error) {
        // fast.log(error.message)
        reply
          .code(400)
          .send({ message: (error as Error).message ?? `Unexpected error` });
        return;
      }

      reply.send({ message: `Card has been added successfully.` });
    },
  });
};

export default apiRoutes;
