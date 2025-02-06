import { LikeDTO } from "../../../dtos/LikeDTO";
import { ILikeService } from "../interfaces/ILikeService";
import { Service } from "../../../shared/abstracts/Service";

export class LikeService extends Service implements ILikeService {
  create(data: {
    userId: string;
    postId?: string | null | undefined;
    commentId?: string | null | undefined;
  }): Promise<LikeDTO> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<LikeDTO[]> {
    throw new Error("Method not implemented.");
  }
  get(id: string): Promise<LikeDTO | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<LikeDTO> {
    throw new Error("Method not implemented.");
  }
}
