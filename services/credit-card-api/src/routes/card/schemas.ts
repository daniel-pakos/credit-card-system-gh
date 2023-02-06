/**
 * Schema definition for valid body parameters for addining new card via POST method
 */
const addCardPostSchema = {
  body: {
    type: "object",
    required: ["name", "number", "limit"],
    properties: {
      name: { type: "string" },
      number: { type: "number" },
      limit: { type: "number" },
    },
  },
};

export { addCardPostSchema };
