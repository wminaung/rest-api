import { MediaType } from "../enums/MediaType";

export interface MediaDTO {
  id: string;
  url: string;
  type: MediaType;
  userId: string;

  createdAt: Date;
}
