import { NotFoundError, UnauthorizedError } from "../../errors";
import { FollowDTO } from "../../dtos/FollowDTO";
import { IFollowRepo } from "../interfaces/repo/IFollowRepo";
import {
  createFollowSchema,
  CreateFollowSchema,
  deleteFollowSchema,
  DeleteFollowSchema,
} from "../../schemas/followSchema";
import { Service } from "./Service";
import { IFollowService } from "../interfaces/services/IFollowService";

export class FollowService extends Service implements IFollowService {
  constructor(private followRepo: IFollowRepo) {
    super();
  }

  async followUser(data: CreateFollowSchema): Promise<FollowDTO> {
    const { followerId, followingId } = this.validate(data, createFollowSchema);

    const follow = await this.followRepo.getFollow(followerId, followingId);
    if (follow) {
      throw new UnauthorizedError("You are already following this user");
    }
    return this.followRepo.create({ followerId, followingId });
  }
  async unfollowUser(data: DeleteFollowSchema): Promise<FollowDTO> {
    const { followerId, followingId } = this.validate(data, deleteFollowSchema);
    const follow = await this.followRepo.getFollow(followerId, followingId);

    if (!follow) {
      throw new NotFoundError("You are not following this user");
    }

    return this.followRepo.delete({ followerId, followingId });
  }

  async getFollowers(userId: string): Promise<FollowDTO[]> {
    return await this.followRepo.getFollowers(userId);
  }

  async getFollowing(userId: string): Promise<FollowDTO[]> {
    return await this.followRepo.getFollowing(userId);
  }
}
