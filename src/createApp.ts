import express from "express";
import usersRouter from "./routes/users";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use((req, res, next) => {
    console.log(`${req.method}: ${req.originalUrl} ${req.url}`);
    next();
  });

  app.use("/api/users", usersRouter);

  return app;
}
