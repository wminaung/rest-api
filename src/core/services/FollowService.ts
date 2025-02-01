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

    return this.followRepo.createFollow({ followerId, followingId });
  }
  async unfollowUser(data: DeleteFollowSchema): Promise<FollowDTO> {
    if (data.followerId === data.followingId) {
      throw new UnauthorizedError("You cannot unfollow yourself");
    }
    const followerId = this.getValidId(data.followerId);
    const followingId = this.getValidId(data.followingId);
    return this.followRepo.deleteFollow(followerId, followingId);
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
}
