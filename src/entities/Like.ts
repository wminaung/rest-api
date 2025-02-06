import { Post } from "./Post";
import { User } from "./User";

export interface Like {
  id: string;
  createdAt: Date;
  userId: string;
  postId?: string | null;
  commentId?: string | null;
  user: User;
  post?: Post | null;
  comment?: Comment | null;
}
