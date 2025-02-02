import { NotFoundError, ValidationError } from "../../errors";
import { CategoryDTO } from "../dtos/CategoryDTO";
import { PostDTO } from "../dtos/PostDTO";
import { IPostRepo } from "../repositories/interfaces/IPostRepo";
import {
  createPostSchema,
  CreatePostSchema,
  updatePostSchema,
  UpdatePostSchema,
} from "../schemas/postSchema";
import { Service } from "./Service";

export class PostService extends Service {
  constructor(private postRepo: IPostRepo) {
    super();
  }
  async getAll(): Promise<PostDTO[]> {
    return this.postRepo.getAll();
  }

  async get(id: string): Promise<PostDTO | null> {
    const validId = this.getValidId(id);
    const post = await this.postRepo.get(validId);
    if (!post) throw new NotFoundError("Post not found");
    return post;
  }

  async create(data: CreatePostSchema): Promise<PostDTO> {
    const safeData = this.validate(data, createPostSchema);
    return this.postRepo.create(safeData);
  }

  async update(id: string, data: UpdatePostSchema): Promise<PostDTO> {
    const validId = this.getValidId(id);
    const safeData = this.validate(data, updatePostSchema);
    return this.postRepo.update(validId, safeData);
  }

  async delete(id: string): Promise<PostDTO> {
    const validId = this.getValidId(id);
    return this.postRepo.delete(validId);
  }

  async getCategory(postId: string): Promise<CategoryDTO | null> {
    const validPostId = this.getValidId(postId);
    return this.postRepo.getCategoryByPostId(validPostId);
  }

  //**** End of Class *****/
}
