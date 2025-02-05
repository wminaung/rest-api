import { PostDTO } from "../../dtos/PostDTO";
import { IPostTagService } from "../interfaces/services/IPostTagService";
import { Service } from "./Service";

export class PostTagService extends Service implements IPostTagService {
  create(data: { postId: string; tagId: string }): Promise<PostDTO> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<PostDTO[]> {
    throw new Error("Method not implemented.");
  }
  get(id: string): Promise<PostDTO | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<PostDTO> {
    throw new Error("Method not implemented.");
  }
}
