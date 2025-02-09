import prisma from "../../db/prisma";
import { LikeController } from "./controllers/LikeController";
import { LikeRepo } from "./repositories/LikeRepo";
import { LikeService } from "./services/LikeService";

export const likeRepo = LikeRepo.getInstance(prisma);
export const likeService = LikeService.getInstance(likeRepo);
export const likeController = LikeController.getInstance(likeService);
