import { LikeDTO } from "../../../dtos/LikeDTO"; // Assuming you have a LikeDTO
import { CreateLikeSchema } from "../../../schemas/likeSchema";
import { ICreate, IDelete, IGet, IGetAll } from "../repo/IBaseRepo";

export interface ILikeService
  extends ICreate<LikeDTO, CreateLikeSchema>,
    IGetAll<LikeDTO>,
    IGet<LikeDTO>,
    IDelete<LikeDTO> {}
