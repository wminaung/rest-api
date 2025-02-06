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
import { CategoryDTO } from "../../../dtos/CategoryDTO";

export interface IPostService
  extends ICreate<PostDTO, CreatePostSchema>,
    IGetAll<PostDTO>,
    IGet<PostDTO>,
    IUpdate<PostDTO, UpdatePostSchema>,
    IDelete<PostDTO> {
  getCategory(postId: string): Promise<CategoryDTO | null>;
  getPostsByUserId(userId: string): Promise<PostDTO[]>;
}
