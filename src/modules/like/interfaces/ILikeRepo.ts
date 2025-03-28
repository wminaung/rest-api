import { LikeDTO } from "../../../dtos/LikeDTO"; // Assuming you have a LikeDTO
import { CreateLikeSchema } from "../../../shared/schemas/likeSchema";
import {
  ICreate,
  IDelete,
  IGet,
  IGetAll,
  IUpdate,
} from "../../../shared/interfaces/crud.interfaces";
import { PrismaClient } from "@prisma/client";
import { Repository } from "../../../shared/abstracts/Repository";

export interface ILikeRepo
  extends ICreate<LikeDTO, CreateLikeSchema>,
    IGetAll<LikeDTO>,
    IGet<LikeDTO>,
    IDelete<LikeDTO> {}
