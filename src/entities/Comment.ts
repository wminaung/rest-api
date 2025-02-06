import { Like } from "./Like";
import { Post } from "./Post";
import { User } from "./User";

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  userId: string;
  postId: string;
  user: User;
  post: Post;
  likes: Like[];
}
