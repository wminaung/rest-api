import { MediaDTO } from "../../../dtos/MediaDTO";
import { Repository } from "../../../shared/abstracts/Repository";
import { IMediaRepo } from "../interfaces/IMediaRepo";

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
