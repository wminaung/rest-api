import { PostTagDTO } from "../../../dtos/PostTagDTO";
import { CreatePostTagSchema } from "../../../schemas/postTagSchema";
import {
  ICreate,
  IDelete,
  IGet,
  IGetAll,
} from "../../../shared/interfaces/crud.interfaces";

export interface IPostTagRepo
  extends ICreate<PostTagDTO, CreatePostTagSchema>,
    IGetAll<PostTagDTO>,
    IGet<PostTagDTO>,
    IDelete<PostTagDTO> {}
