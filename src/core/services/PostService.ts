import { NotFoundError } from "../../errors";
import { IPostRepo } from "../interfaces/repo/IPostRepo";
import {
  createPostSchema,
  CreatePostSchema,
  updatePostSchema,
  UpdatePostSchema,
} from "../../schemas/postSchema";
import { Service } from "./Service";
import { PostDTO } from "../../dtos/PostDTO";
import { CategoryDTO } from "../../dtos/CategoryDTO";
import { IPostService } from "../interfaces/services/IPostService";
import { JwtAuthPayload } from "../../types/jwtAuthPayload";

export class PostService extends Service implements IPostService {
  constructor(private postRepo: IPostRepo) {
    super();
  }

  async create(createCategoryData: CreatePostSchema): Promise<PostDTO> {
    const safeData = this.validate(createCategoryData, createPostSchema);
    return this.postRepo.create(safeData);
  }

  async getAll(): Promise<PostDTO[]> {
    return this.postRepo.getAll();
  }

  async get(postId: string): Promise<PostDTO | null> {
    const validId = this.getValidId(postId);
    const post = await this.postRepo.get(validId);
    if (!post) throw new NotFoundError("Post not found");
    return post;
  }

  async update(postId: string, data: UpdatePostSchema): Promise<PostDTO> {
    const validId = this.getValidId(postId);
    const safeData = this.validate(data, updatePostSchema);
    return this.postRepo.update(validId, safeData);
  }

  async delete(postId: string): Promise<PostDTO> {
    const validId = this.getValidId(postId);
    return this.postRepo.delete(validId);
  }

  async getCategory(postId: string): Promise<CategoryDTO | null> {
    const validPostId = this.getValidId(postId);
    return this.postRepo.getCategoryByPostId(validPostId);
  }

  //**** End of Class *****/
}
