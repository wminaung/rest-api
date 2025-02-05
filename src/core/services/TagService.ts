import { TagDTO } from "../../dtos/TagDTO";
import { ITagService } from "../interfaces/services/ITagService";
import { Service } from "./Service";

export class TagService extends Service implements ITagService {
  create(data: { name: string }): Promise<TagDTO> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<TagDTO[]> {
    throw new Error("Method not implemented.");
  }
  get(id: string): Promise<TagDTO | null> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: { name?: string | undefined }): Promise<TagDTO> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<TagDTO> {
    throw new Error("Method not implemented.");
  }
}
