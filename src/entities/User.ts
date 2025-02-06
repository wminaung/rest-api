import { Role } from "../../enums/Role";
import { Follow } from "./Follow";
import { Like } from "./Like";
import { Media } from "./Media";
import { Post } from "./Post";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  profilePicture?: string | null;
  bio?: string | null;
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
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
