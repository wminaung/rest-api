import prisma from "../../db/prisma";
import { userRepo } from "../user";
import { PostController } from "./controllers/PostController";
import { PostRepo } from "./repositories/PostRepo";
import { PostService } from "./services/PostService";

export const postRepo = PostRepo.getInstance(prisma);
export const postService = PostService.getInstance(postRepo, userRepo);
export const postController = PostController.getInstance(postService);
