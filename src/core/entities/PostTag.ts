import { Post } from "./Post";
import { Tag } from "./Tag";

export interface PostTag {
  id: string;
  postId: string;
  tagId: string;
  post: Post;
  tag: Tag;
}
