import { PrismaClient } from "@prisma/client";
import { FollowDTO } from "../../../dtos/FollowDTO";
import {
  CreateFollowSchema,
  DeleteFollowSchema,
} from "../../../schemas/followSchema";
import { IFollowRepo } from "../interfaces/IFollowRepo";
import { NotFoundError } from "../../../errors";
import { Repository } from "../Repository";

export class FollowRepo extends Repository implements IFollowRepo {
  constructor(private prisma: PrismaClient) {
    super();
  }
  async getFollow(
    followerId: string,
    followingId: string
  ): Promise<FollowDTO | null> {
    return this.prisma.follow.findFirst({
      where: {
        followerId,
        followingId,
      },
    });
  }

  async create(data: CreateFollowSchema): Promise<FollowDTO> {
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

  /**
   * Retrieves all the users that follow the given user.
   * @param userId The id of the user to retrieve the followers for.
   * @returns A list of FollowDTOs representing the followers of the given user.
   */
  async getFollowers(userId: string): Promise<FollowDTO[]> {
    return this.executePrismaQuery(
      () =>
        this.prisma.follow.findMany({
          where: { followingId: userId },
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

  async delete({
    followerId,
    followingId,
  }: DeleteFollowSchema): Promise<FollowDTO> {
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
