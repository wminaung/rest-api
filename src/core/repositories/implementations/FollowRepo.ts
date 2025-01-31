import { PrismaClient } from "@prisma/client";
import { FollowDTO } from "../../dtos/FollowDTO";
import { CreateFollowSchema } from "../../schemas/followSchema";
import { IFollowRepo } from "../interfaces/IFollowRepo";
import { NotFoundError } from "../../../errors";
import { PrismaHelper } from "../../helpers/PrismaHelper";

export class FollowRepo extends PrismaHelper implements IFollowRepo {
  constructor(private prisma: PrismaClient) {
    super();
  }

  async createFollow(data: CreateFollowSchema): Promise<FollowDTO> {
    return this.executePrismaQuery(
      () =>
        this.prisma.follow.create({
          data: {
            followerId: data.followerId,
            followingId: data.followingId,
          },
        }),
      "Error creating follow"
    );
  }

  async getFollowers(userId: string): Promise<FollowDTO[]> {
    return this.executePrismaQuery(
      () =>
        this.prisma.follow.findMany({
          where: { followingId: userId }, // Users who are following this user
        }),
      "Error fetching followers"
    );
  }

  async getFollowing(userId: string): Promise<FollowDTO[]> {
    return this.executePrismaQuery(
      () =>
        this.prisma.follow.findMany({
          where: { followerId: userId },
        }),
      "Error fetching following"
    );
  }

  async deleteFollow(
    followerId: string,
    followingId: string
  ): Promise<FollowDTO> {
    return this.executePrismaQuery(async () => {
      const followIdToDelete = await this.findFollowId(followerId, followingId);
      if (!followIdToDelete) {
        throw new NotFoundError("Follow not found");
      }
      return this.prisma.follow.delete({
        where: {
          id: followIdToDelete,
        },
      });
    }, "Error deleting follow");
  }

  private async findFollowId(
    followerId: string,
    followingId: string
  ): Promise<string | null> {
    const follow = await this.prisma.follow.findFirst({
      where: {
        followerId,
        followingId,
      },
    });

    return follow?.id || null;
  }
}
