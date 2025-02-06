import { PrismaClient } from "@prisma/client";
import { FollowService } from "../../modules/follow/services/FollowService";
import { FollowController } from "../../modules/follow/controllers/FollowController";
import { FollowRepo } from "../../modules/follow/repositories/FollowRepo";

export const createFollowController = (prisma: PrismaClient) => {
  const followRepo = new FollowRepo(prisma);
  const followService = new FollowService(followRepo);
  return new FollowController(followService);
};
