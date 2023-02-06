import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

const apiRoutes = async (fast: FastifyInstance) => {
  const dbName = fast.config(`DB_CARDS_NAME`);

  /**
   * Handler for retrieving cards from the storage
   * @returns {object} Saved cards
   */
  const getCardsFromCache = async () => {
    const cards = await fast.redis.get(dbName);

    return cards;
  };

  /**
   * Define "/cards" GET request
   */
  fast.get("/", {
    handler: async (req: FastifyRequest, reply: FastifyReply) => {
      const cards = (await getCardsFromCache()) ?? {};

      reply.send(cards);
    },
  });

  /**
   * Define "/cards" DELETE request
   */
  fast.delete("/", {
    handler: async (req: FastifyRequest, reply: FastifyReply) => {
      const deleted = await fast.redis.del(dbName);

      reply.send(deleted);
    },
  });
};

export default apiRoutes;
