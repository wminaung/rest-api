import { MediaDTO } from "../../dtos/MediaDTO";
import { IMediaRepo } from "../interfaces/repo/IMediaRepo";
import { Repository } from "./Repository";

export class MediaRepo extends Repository implements IMediaRepo {
  create(data: any): Promise<MediaDTO> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<MediaDTO[]> {
    throw new Error("Method not implemented.");
  }
  get(id: string): Promise<MediaDTO | null> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: any): Promise<MediaDTO> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<MediaDTO> {
    throw new Error("Method not implemented.");
  }
}
