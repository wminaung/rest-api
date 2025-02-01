import { NotFoundError, UnauthorizedError } from "../../errors";
import { FollowDTO } from "../dtos/FollowDTO";
import { IFollowRepo } from "../repositories/interfaces/IFollowRepo";
import {
  CreateFollowSchema,
  DeleteFollowSchema,
} from "../schemas/followSchema";
import { Service } from "./Service";

export class FollowService extends Service {
  constructor(private followRepo: IFollowRepo) {
    super();
  }

  async followUser(data: CreateFollowSchema): Promise<FollowDTO> {
    if (data.followerId === data.followingId) {
      throw new UnauthorizedError("You cannot follow yourself");
    }
    const followerId = this.getValidId(data.followerId);
    const followingId = this.getValidId(data.followingId);

    const follow = await this.followRepo.getFollow(followerId, followingId);

    if (follow) {
      throw new UnauthorizedError("You are already following this user");
    }
    return this.followRepo.createFollow({ followerId, followingId });
  }
  async unfollowUser(data: DeleteFollowSchema): Promise<FollowDTO> {
    if (data.followerId === data.followingId) {
      throw new UnauthorizedError("You cannot unfollow yourself");
    }
    const followerId = this.getValidId(data.followerId);
    const followingId = this.getValidId(data.followingId);

    const follow = await this.followRepo.getFollow(followerId, followingId);

    if (!follow) {
      throw new NotFoundError("You are not following this user");
    }

    return this.followRepo.deleteFollow(followerId, followingId);
  }

  async getFollowers(userId: string): Promise<FollowDTO[]> {
    return await this.followRepo.getFollowers(userId);
  }

  async getFollowing(userId: string): Promise<FollowDTO[]> {
    return await this.followRepo.getFollowing(userId);
  }
}
