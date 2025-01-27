import { Follow } from "./Follow";
import { Like } from "./Like";
import { Media } from "./Media";
import { Post } from "./Post";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  profilePicture?: string | null;
  bio?: string | null;
  createdAt: Date;
  updatedAt: Date;
  posts: Post[];
  comments: Comment[];
  likes: Like[];
  followers: Follow[];
  following: Follow[];
  notifications: Notification[];
  media: Media[];
}
