import { LikeDTO } from "../../dtos/LikeDTO";
import { ILikeRepo } from "../interfaces/repo/ILikeRepo";
import { Repository } from "./Repository";

export class LikeRepo extends Repository implements ILikeRepo {
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
