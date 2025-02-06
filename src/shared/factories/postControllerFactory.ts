import { PrismaClient } from "@prisma/client";
import { PostService } from "../../modules/post/services/PostService";
import { PostController } from "../../modules/post/controllers/PostController";
import { PostRepo } from "../../modules/post/repositories/PostRepo";

export const createPostController = (prisma: PrismaClient) => {
  const postRepo = new PostRepo(prisma);
  const postService = new PostService(postRepo);
  return new PostController(postService);
};
