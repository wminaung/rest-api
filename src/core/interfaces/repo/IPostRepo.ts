import { CategoryDTO } from "../../../dtos/CategoryDTO";
import { CommentDTO } from "../../../dtos/CommentDTO";
import { LikeDTO } from "../../../dtos/LikeDTO";
import { PostDTO } from "../../../dtos/PostDTO";
import { TagDTO } from "../../../dtos/TagDTO";
import {
  CreatePostSchema,
  UpdatePostSchema,
} from "../../../schemas/postSchema";
import { ICreate, IDelete, IGet, IGetAll, IUpdate } from "./IBaseRepo";

export interface IPostRepo
  extends ICreate<PostDTO, CreatePostSchema>,
    IGetAll<PostDTO>,
    IGet<PostDTO>,
    IUpdate<PostDTO, UpdatePostSchema>,
    IDelete<PostDTO> {
  getCategoryByPostId: (id: string) => Promise<CategoryDTO | null>;
  getCommentsByPostId: (id: string) => Promise<CommentDTO[]>;
  getLikesByPostId: (id: string) => Promise<LikeDTO[]>;
  getTagsByPostId: (id: string) => Promise<TagDTO[]>;
}
