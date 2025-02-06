import { PostDTO } from "../../../dtos/PostDTO";
import { CreatePostTagSchema } from "../../../shared/schemas/postTagSchema";
import {
  ICreate,
  IDelete,
  IGet,
  IGetAll,
} from "../../../shared/interfaces/crud.interfaces";

export interface IPostTagService
  extends ICreate<PostDTO, CreatePostTagSchema>,
    IGetAll<PostDTO>,
    IGet<PostDTO>,
    IDelete<PostDTO> {}
