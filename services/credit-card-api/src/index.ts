import server from "./app.js";
import { terminate } from "./utils/index.js";

const port = process.env["APP_PORT"] ?? 3000;
const host = process.env["APP_HOST"] ?? "127.0.0.1";

server()
  .then((app) => {
    app
      .listen({ port: <number>port, host: <string>host })
      .then(() => {
        const exitHandler = terminate(app, {
          coredump: false,
          timeout: 500,
        });

        process.on("uncaughtException", exitHandler());
        process.on("unhandledRejection", exitHandler());
        process.on("SIGTERM", exitHandler());
        process.on("SIGINT", exitHandler());
      })
      .catch((err: Error) => {
        console.log("Error starting server: ", err);
        process.exit(1);
      });
  })
  .catch((err) => console.log(err));
