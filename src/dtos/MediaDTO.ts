import { MediaType } from "../shared/enums/MediaType";

export interface MediaDTO {
  id: string;
  url: string;
  type: MediaType;
  userId: string;
  postId: string;

  createdAt: Date;
}
