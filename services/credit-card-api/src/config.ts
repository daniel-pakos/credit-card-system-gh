import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { createRequire } from "module";
const requireJson = createRequire(import.meta.url);
const packageJson = requireJson("../package.json");

declare module "fastify" {
  interface FastifyInstance {
    config: Config;
  }
}

const optionalEnv = (name: string, defaultValue = ""): string => {
  return process.env[name] ?? defaultValue;
};

// const requiredEnv = (name: string): string => {
//   const value = optionalEnv(name);
//   if (!value) {
//     throw new Error(`Required environment variable is not set: ${name}`);
//   }
//   return value;
// };

const defaults = {
  APP_NAME: packageJson.name,
  APP_VERSION: packageJson.version,
};

const envs = {
  APP_HOST: optionalEnv("APP_HOST", `0.0.0.0`),
  APP_PORT: optionalEnv("APP_PORT", `3000`),
  API_PREFIX: optionalEnv("CCAPI_API_PREFIX", `api/v1`),
  DB_CARDS_NAME: optionalEnv("DB_CARDS_NAME", "cards"),
  REDIS_PORT: optionalEnv("CCAPI_REDIS_PORT", `6379`),
  REDIS_URL: optionalEnv("CCAPI_REDIS_URL", ``),
  REDIS_HOST: optionalEnv("CCAPI_REDIS_HOST", `localhost`),
};

const config = { ...defaults, ...envs };

const configPlugin = (
  fast: FastifyInstance,
  options: object,
  done: (err?: Error) => void
) => {
  void options;

  /**
   * Add config method
   * TODO: refactor to class getter
   */
  fast.decorate("config", (name: keyof Config): string => config[name]);

  done();
};

export default fp(configPlugin, {
  fastify: "4.x",
  name: "configPlugin",
});

export interface Config {
  (name: string);
  API_PREFIX: string;
  APP_HOST: string;
  APP_PORT: number;
  REDIS_PORT: number;
  REDIS_URL: string;
  REDIS_HOST: string;
}

type envs = {
  API_PREFIX: string;
  APP_HOST: string;
  APP_PORT: number;
  REDIS_PORT: number;
  REDIS_URL: string;
  REDIS_HOST: string;
};
