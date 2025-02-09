import { LikeDTO } from "../../../dtos/LikeDTO";
import { ILikeService } from "../interfaces/ILikeService";
import { Service } from "../../../shared/abstracts/Service";
import {
  createLikeSchema,
  CreateLikeSchema,
} from "../../../shared/schemas/likeSchema";
import { JwtAuthPayload } from "../../../shared/types/jwtAuthPayload";
import { ILikeRepo } from "../interfaces/ILikeRepo";
import { UnauthorizedError } from "../../../shared/errors";

export class LikeService extends Service implements ILikeService {
  private static instance: LikeService;
  static getInstance(likeRepo: ILikeRepo): LikeService {
    if (!LikeService.instance) {
      LikeService.instance = new LikeService(likeRepo);
    }
    return LikeService.instance;
  }

  constructor(private likeRepo: ILikeRepo) {
    super();
  }

  async create(
    data: CreateLikeSchema,
    user?: JwtAuthPayload
  ): Promise<LikeDTO> {
    const authorizedUser = this.hasAuthUserOrThrow(user);
    const validLikeData = this.validateOrThrow(data, createLikeSchema);

    return this.likeRepo.create({
      ...validLikeData,
      userId: authorizedUser.id,
    });
  }
  getAll(): Promise<LikeDTO[]> {
    return this.likeRepo.getAll();
  }
  get(id: string): Promise<LikeDTO | null> {
    return this.likeRepo.get(this.getValidIdOrThrow(id));
  }
  async delete(id: string, user?: JwtAuthPayload): Promise<LikeDTO> {
    const validId = this.getValidIdOrThrow(id);
    const authorizedUser = this.hasAuthUserOrThrow(user);

    // note: check authorization
    const like = await this.get(id);
    if (!like || like.userId !== authorizedUser.id) {
      throw new UnauthorizedError("Like not found");
    }

    return this.likeRepo.delete(validId);
  }
}
