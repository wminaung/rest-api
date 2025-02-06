import { PostDTO } from "../../../dtos/PostDTO";
import {
  CreatePostSchema,
  UpdatePostSchema,
} from "../../../shared/schemas/postSchema";
import {
  ICreate,
  IDelete,
  IGet,
  IGetAll,
  IUpdate,
} from "../../../shared/interfaces/crud.interfaces";

export interface IPostService
  extends ICreate<PostDTO, CreatePostSchema>,
    IGetAll<PostDTO>,
    IGet<PostDTO>,
    IUpdate<PostDTO, UpdatePostSchema>,
    IDelete<PostDTO> {}
