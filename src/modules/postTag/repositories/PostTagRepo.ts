import { PostTagDTO } from "../../../dtos/PostTagDTO";
import { Repository } from "../../../shared/abstracts/Repository";
import { IPostTagRepo } from "../interfaces/IPostTagRepo";

export class PostTag extends Repository implements IPostTagRepo {
  getAll(): Promise<PostTagDTO[]> {
    throw new Error("Method not implemented.");
  }
  get(id: string): Promise<PostTagDTO | null> {
    throw new Error("Method not implemented.");
  }
  create(data: any): Promise<PostTagDTO> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<PostTagDTO> {
    throw new Error("Method not implemented.");
  }
}
