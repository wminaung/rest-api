import express from "express";
import userRouters from "./modules/user/routes/userRoutes";
import { authenticationToken } from "./middlewares/jwt-utils";
import path from "path";
import authRouters from "./modules/auth/routes/authRoutes";
import postRouters from "./modules/post/routes/postRouters";
import categoryRouters from "./modules/category/routes/categoryRouters";
import followRouters from "./modules/follow/routes/followRouters";
import likeRouters from "./modules/like/routes/likeRouters";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(express.static(path.join(__dirname, "..", "public")));

  app.use((req, res, next) => {
    console.log(`${req.method}: ${req.originalUrl} ${req.url}`);
    next();
  });

  app.use("/api/auth", authRouters);
  app.use("/api", authenticationToken);
  app.use("/api/users", userRouters);
  app.use("/api/categories", categoryRouters);
  // app.use("/api/follows", followRouters);
  app.use("/api/posts", postRouters);
  app.use("/api/likes", likeRouters);

  return app;
}
