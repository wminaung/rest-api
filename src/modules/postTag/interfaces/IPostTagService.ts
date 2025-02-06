import { PostDTO } from "../../../dtos/PostDTO";
import { CreatePostTagSchema } from "../../../schemas/postTagSchema";
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
