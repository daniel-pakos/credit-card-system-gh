import { FastifyInstance } from "fastify";

const apiRoutes = async (fast: FastifyInstance) => {
  fast.get("/", () => `Service ${fast.config("APP_NAME")} is working.`);

  fast.get("/version", async () => {
    return { version: fast.config("APP_VERSION") };
  });
};

export default apiRoutes;
