import express from "express";
import usersRouter from "./routes/users";
import categoriesRouter from "./routes/categories";
import followsRouter from "./routes/follows";
import postRouter from "./routes/posts";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use((req, res, next) => {
    console.log(`${req.method}: ${req.originalUrl} ${req.url}`);
    next();
  });

  app.use("/api/users", usersRouter);
  app.use("/api/categories", categoriesRouter);
  app.use("/api/follows", followsRouter);
  app.use("/api/posts", postRouter);

  return app;
}
