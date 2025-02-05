import { PostDTO } from "../../../dtos/PostDTO";
import {
  CreatePostSchema,
  UpdatePostSchema,
} from "../../../schemas/postSchema";
import { ICreate, IDelete, IGet, IGetAll, IUpdate } from "../repo/IBaseRepo";

export interface IPostService
  extends ICreate<PostDTO, CreatePostSchema>,
    IGetAll<PostDTO>,
    IGet<PostDTO>,
    IUpdate<PostDTO, UpdatePostSchema>,
    IDelete<PostDTO> {}
