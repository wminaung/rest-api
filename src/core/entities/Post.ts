import { Category } from "./Category";
import { Like } from "./Like";
import { PostTag } from "./PostTag";
import { User } from "./User";

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
  comments: Comment[];
  likes: Like[];
  tags: PostTag[];
  categoryId?: string | null;
  category?: Category | null;
}
