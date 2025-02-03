import { CategoryDTO } from "../../../dtos/CategoryDTO";
import { CommentDTO } from "../../../dtos/CommentDTO";
import { LikeDTO } from "../../../dtos/LikeDTO";
import { PostDTO } from "../../../dtos/PostDTO";
import { TagDTO } from "../../../dtos/TagDTO";
import {
  CreatePostSchema,
  UpdatePostSchema,
} from "../../../schemas/postSchema";

export interface IPostRepo {
  getAll: () => Promise<PostDTO[]>;
  get: (id: string) => Promise<PostDTO | null>;
  create: (data: CreatePostSchema) => Promise<PostDTO>;
  update: (id: string, data: UpdatePostSchema) => Promise<PostDTO>;
  delete: (id: string) => Promise<PostDTO>;

  getCategoryByPostId: (id: string) => Promise<CategoryDTO | null>;
  getCommentsByPostId: (id: string) => Promise<CommentDTO[]>;
  getLikesByPostId: (id: string) => Promise<LikeDTO[]>;
  getTagsByPostId: (id: string) => Promise<TagDTO[]>;
}
