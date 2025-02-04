import { PostDTO } from "../../../dtos/PostDTO";
import {
  CreatePostSchema,
  UpdatePostSchema,
} from "../../../schemas/postSchema";
import { JwtAuthPayload } from "../../../types/jwtAuthPayload";

export interface IPostService {
  create(createCategoryData: CreatePostSchema): Promise<PostDTO>;
  getAll(): Promise<PostDTO[]>;
  get(postId: string): Promise<PostDTO | null>;
  update(postId: string, updatePostData: UpdatePostSchema): Promise<PostDTO>;
  delete(postId: string): Promise<PostDTO>;
}
