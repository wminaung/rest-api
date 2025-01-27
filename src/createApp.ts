import express from "express";
import usersRouter from "./routes/users";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use("/api/users", usersRouter);

  return app;
}
