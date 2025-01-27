import { MediaType } from "../enums/MediaType";
import { User } from "./User";

export interface Media {
  id: string;
  url: string;
  type: MediaType;
  createdAt: Date;
  userId: string;
  user: User;
}
