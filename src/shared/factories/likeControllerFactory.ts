import { PrismaClient } from "@prisma/client";
import { LikeRepo } from "../../modules/like/repositories/LikeRepo";
import { LikeService } from "../../modules/like/services/LikeService";
import { LikeController } from "../../modules/like/controllers/LikeController";

export const createLikeController = (prisma: PrismaClient) => {
  const repo = new LikeRepo(prisma);
  const service = new LikeService(repo);
  return new LikeController(service);
};
