import { PostTag } from "./PostTag";

export interface Tag {
  id: string;
  name: string;
  createdAt: Date;
  postTags: PostTag[];
}
