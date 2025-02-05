import { FollowDTO } from "../../../dtos/FollowDTO";
import {
  CreateFollowSchema,
  DeleteFollowSchema,
} from "../../../schemas/followSchema";

export interface IFollowRepo {
  create(data: CreateFollowSchema): Promise<FollowDTO>;
  getFollow(followerId: string, followingId: string): Promise<FollowDTO | null>;
  getFollowers(userId: string): Promise<FollowDTO[]>;
  getFollowing(userId: string): Promise<FollowDTO[]>;
  delete(data: DeleteFollowSchema): Promise<FollowDTO>;
}
