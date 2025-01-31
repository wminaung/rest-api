import {
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../../errors";
import { FollowDTO } from "../dtos/FollowDTO";
import { IFollowRepo } from "../repositories/interfaces/IFollowRepo";
import { checkIdSchema } from "../schemas/checkIdSchema";
import { CreateFollowSchema } from "../schemas/followSchema";
import { ServiceHelper } from "../helpers/ServiceHelper";

export class FollowService extends ServiceHelper {
  constructor(private followRepo: IFollowRepo) {
    super();
  }

  async createFollow(data: CreateFollowSchema): Promise<FollowDTO> {
    if (data.followerId === data.followingId) {
      throw new UnauthorizedError("You cannot follow yourself");
    }

    return this.followRepo.createFollow(data);
  }

  async getFollowers(userId: string): Promise<FollowDTO[]> {
    const followers = await this.followRepo.getFollowers(userId);
    if (followers.length === 0) {
      throw new NotFoundError("No followers found for this user");
    }
    return followers;
  }

  async getFollowing(userId: string): Promise<FollowDTO[]> {
    const following = await this.followRepo.getFollowing(userId);
    if (following.length === 0) {
      throw new NotFoundError("You are not following anyone");
    }
    return following;
  }

  // Delete a follow relationship
  async deleteFollow(
    followerId: string,
    followingId: string
  ): Promise<FollowDTO> {
    if (followerId === followingId) {
      throw new UnauthorizedError("You cannot unfollow yourself");
    }

    return this.followRepo.deleteFollow(followerId, followingId);
  }
}
