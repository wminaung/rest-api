import { LikeDTO } from "../../../dtos/LikeDTO"; // Assuming you have a LikeDTO
import { CreateLikeSchema } from "../../../schemas/likeSchema";
import { ICreate, IDelete, IGet, IGetAll, IUpdate } from "./IBaseRepo";

export interface ILikeRepo
  extends ICreate<LikeDTO, CreateLikeSchema>,
    IGetAll<LikeDTO>,
    IGet<LikeDTO>,
    IDelete<LikeDTO> {}
