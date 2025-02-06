import { PostDTO } from "../../../dtos/PostDTO";
import { Service } from "../../../shared/abstracts/Service";
import { IPostTagService } from "../interfaces/IPostTagService";

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
