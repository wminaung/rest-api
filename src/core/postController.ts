import { PrismaClient } from "@prisma/client";
import { PostRepo } from "./repositories/implementations/PostRepo";
import { PostService } from "./services/PostService";
import { PostController } from "./controllers/PostController";

export const createPostController = (prisma: PrismaClient) => {
  const postRepo = new PostRepo(prisma);
  const postService = new PostService(postRepo);
  return new PostController(postService);
};
