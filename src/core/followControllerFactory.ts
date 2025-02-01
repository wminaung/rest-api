import { PrismaClient } from "@prisma/client";
import { FollowRepo } from "./repositories/implementations/FollowRepo";
import { FollowService } from "./services/FollowService";
import { FollowController } from "./controllers/FollowController";

export const createFollowController = (prisma: PrismaClient) => {
  const followRepo = new FollowRepo(prisma);
  const followService = new FollowService(followRepo);
  return new FollowController(followService);
};
