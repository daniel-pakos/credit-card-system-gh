import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { fastify as Fastify, FastifyReply, FastifyRequest } from "fastify";
import healthcheck from "fastify-healthcheck";
import cors from "@fastify/cors";
import autoLoad from "@fastify/autoload";
import { Logger } from "./utils/index.js";
import ERROR_CODES from "./errors/index.js";
import { default as redis, FastifyRedis } from "@fastify/redis";

import { default as config, Config } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Err extends Error {
  statusCode: number;
}

declare module "fastify" {
  interface FastifyInstance {
    config: Config;
    redis: FastifyRedis;
  }
}

const server = async () => {
  const fast = Fastify({
    logger: Logger,
  });

  /**
   * Add environmental vars to the app
   */
  await fast.register(config);

  /**
   * Register cors plugin
   */
  await fast.register(cors, {});

  fast.register(healthcheck, { healthcheckUrl: "/" });

  /**
   * Register API routes
   */
  await fast.register(autoLoad, {
    dir: join(__dirname, "routes"), // folder to scan for routes
    forceESM: true, // force using ESM import
    options: {
      prefix: fast.config("API_PREFIX"), // the URL prefix for an API
    },
  });

  /**
   * Register Redis DB
   */
  fast.register(redis, {
    host: fast.config("REDIS_HOST"),
    port: fast.config("REDIS_PORT"),
  });

  fast.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
    fast.log.debug(`Route not found: ${request.method}:${request.raw.url}`);

    reply.status(404).send({
      statusCode: 404,
      error: ERROR_CODES.NOT_FOUND,
      message: `Route ${request.method}:${request.raw.url} not found`,
    });
  });

  fast.setErrorHandler(
    (err: Err, request: FastifyRequest, reply: FastifyReply) => {
      fast.log.debug(`Request url: ${request.raw.url}`);
      fast.log.debug(`Payload: ${request.body}`);
      fast.log.error(`Error occurred: ${err}`);

      const code = err.statusCode ?? 500;

      reply.status(code).send({
        statusCode: code,
        error: err.name ?? ERROR_CODES.INTERNAL_SERVER_ERROR,
        message: err.message ?? err,
      });
    }
  );

  return fast;
};

export default server;
