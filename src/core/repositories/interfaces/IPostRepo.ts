import { PostDTO } from "../../dtos/PostDTO";
import { CreatePostSchema, UpdatePostSchema } from "../../schemas/postSchema";

export interface IPostRepo {
  getAll: () => Promise<PostDTO[]>;
  get: (id: string) => Promise<PostDTO | null>;
  create: (data: CreatePostSchema) => Promise<PostDTO>;
  update: (id: string, data: UpdatePostSchema) => Promise<PostDTO>;
  delete: (id: string) => Promise<PostDTO>;
}
