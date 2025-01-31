import { FollowDTO } from "../../dtos/FollowDTO";
import { CreateFollowSchema } from "../../schemas/followSchema";

export interface IFollowRepo {
  createFollow(data: CreateFollowSchema): Promise<FollowDTO>;
  getFollowers(userId: string): Promise<FollowDTO[]>;
  getFollowing(userId: string): Promise<FollowDTO[]>;
  deleteFollow(followerId: string, followingId: string): Promise<FollowDTO>;
}
