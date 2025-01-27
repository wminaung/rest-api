import { User } from "./User";

export interface Follow {
  id: string;
  createdAt: Date;
  followerId: string;
  followingId: string;
  follower: User;
  following: User;
}
