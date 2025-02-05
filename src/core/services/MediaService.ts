import { MediaDTO } from "../../dtos/MediaDTO";
import { IMediaService } from "../interfaces/services/IMediaService";
import { Service } from "./Service";

export class MediaService extends Service implements IMediaService {
  create(data: {
    url: string;
    type: "IMAGE" | "VIDEO";
    userId?: string | null | undefined;
    postId?: string | null | undefined;
  }): Promise<MediaDTO> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<MediaDTO[]> {
    throw new Error("Method not implemented.");
  }
  get(id: string): Promise<MediaDTO | null> {
    throw new Error("Method not implemented.");
  }
  update(
    id: string,
    data: {
      url?: string | undefined;
      type?: "IMAGE" | "VIDEO" | undefined;
      postId?: string | null | undefined;
    }
  ): Promise<MediaDTO> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<MediaDTO> {
    throw new Error("Method not implemented.");
  }
}
