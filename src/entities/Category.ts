import { Post } from "./Post";

export interface Category {
  id: string;
  name: string;
  createdAt: Date;
  posts: Post[];
}
