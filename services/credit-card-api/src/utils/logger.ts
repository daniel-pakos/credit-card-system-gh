import { pino } from "pino";

const Logger = pino({
  level: process.env["LOG_LEVEL"],
  formatters: {
    level: (level) => ({ level }),
  },
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
  ...(process.env["NODE_ENV"] === "development" && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        levelFirst: true,
        ignore: "time,pid,hostname",
      },
    },
  }),
});

export default Logger;
