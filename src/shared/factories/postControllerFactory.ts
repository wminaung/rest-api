import { PrismaClient } from "@prisma/client";
import { PostService } from "../../modules/post/services/PostService";
import { PostController } from "../../modules/post/controllers/PostController";
import { PostRepo } from "../../modules/post/repositories/PostRepo";
import { UserRepo } from "../../modules/user/repositories/UserRepo";

export const createPostController = (prisma: PrismaClient) => {
  const postRepo = new PostRepo(prisma);
  const userRepo = new UserRepo(prisma);
  const postService = new PostService(postRepo, userRepo);
  return new PostController(postService);
};
