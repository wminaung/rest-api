import express from "express";
import usersRouter from "./routes/users";
import categoriesRouter from "./routes/categories";
import followsRouter from "./routes/follows";
import postRouter from "./routes/posts";
import authRouter from "./routes/auth";
import { authenticationToken } from "./middlewares/jwt-utils";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use((req, res, next) => {
    console.log(`${req.method}: ${req.originalUrl} ${req.url}`);
    next();
  });

  app.use("/api/auth", authRouter);
  app.use("/api/users", authenticationToken, usersRouter);
  app.use("/api/categories", categoriesRouter);
  app.use("/api/follows", followsRouter);
  app.use("/api/posts", authenticationToken, postRouter);

  return app;
}
