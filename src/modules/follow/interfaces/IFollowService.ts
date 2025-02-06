import { FollowDTO } from "../../../dtos/FollowDTO";
import {
  CreateFollowSchema,
  DeleteFollowSchema,
} from "../../../shared/schemas/followSchema";
import { JwtAuthPayload } from "../../../shared/types/jwtAuthPayload";

export interface IFollowService {
  followUser(data: CreateFollowSchema): Promise<FollowDTO>;
  unfollowUser(data: DeleteFollowSchema): Promise<FollowDTO>;

  getFollowers(userId: string): Promise<FollowDTO[]>;
  getFollowing(userId: string): Promise<FollowDTO[]>;
}
