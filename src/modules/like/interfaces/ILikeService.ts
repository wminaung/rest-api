import { LikeDTO } from "../../../dtos/LikeDTO"; // Assuming you have a LikeDTO
import { CreateLikeSchema } from "../../../shared/schemas/likeSchema";
import {
  ICreate,
  IDelete,
  IGet,
  IGetAll,
} from "../../../shared/interfaces/crud.interfaces";

export interface ILikeService
  extends ICreate<LikeDTO, CreateLikeSchema>,
    IGetAll<LikeDTO>,
    IGet<LikeDTO>,
    IDelete<LikeDTO> {}
