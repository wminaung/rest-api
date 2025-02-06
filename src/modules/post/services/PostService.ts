import { IPostRepo } from "../interfaces/IPostRepo";
import {
  createPostSchema,
  CreatePostSchema,
  updatePostSchema,
  UpdatePostSchema,
} from "../../../shared/schemas/postSchema";
import { Service } from "../../../shared/abstracts/Service";
import { PostDTO } from "../../../dtos/PostDTO";
import { CategoryDTO } from "../../../dtos/CategoryDTO";
import { IPostService } from "../interfaces/IPostService";
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../../../shared/errors";
import { JwtAuthPayload } from "../../../shared/types/jwtAuthPayload";
import { IUserRepo } from "../../user/interfaces/IUserRepo";

export class PostService extends Service implements IPostService {
  constructor(private postRepo: IPostRepo, private userRepo: IUserRepo) {
    super();
  }
  async getPostsByUserId(userId: string): Promise<PostDTO[]> {
    const validUserId = this.getValidId(userId);

    // note: check user exists
    const userFomDb = await this.userRepo.get(validUserId);
    if (!userFomDb) {
      throw new NotFoundError("User not found");
    }
    return this.postRepo.getPostsByUserId(validUserId);
  }

  async create(
    createCategoryData: CreatePostSchema,
    user?: JwtAuthPayload
  ): Promise<PostDTO> {
    const validUser = this.hasAuthUserOrThrow(user);
    if (!validUser.id)
      throw new UnauthorizedError("You are not authorized user");

    // note: automatically add userId to post data for safety
    const safeData = this.validate(
      { ...createCategoryData, userId: validUser.id },
      createPostSchema
    );

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

  async update(
    postId: string,
    data: UpdatePostSchema,
    user?: JwtAuthPayload
  ): Promise<PostDTO> {
    const validId = this.getValidId(postId);

    const safeData = this.validate(data, updatePostSchema);
    const validUser = this.hasAuthUserOrThrow(user);

    const post = await this.postRepo.get(validId);

    if (!post) throw new NotFoundError("Post not found");

    if (post.userId !== validUser.id)
      throw new ForbiddenError("You are not allowed to update this post");

    return this.postRepo.update(validId, safeData);
  }

  async delete(postId: string, user?: JwtAuthPayload): Promise<PostDTO> {
    const validId = this.getValidId(postId);
    const validUser = this.hasAuthUserOrThrow(user);

    // note: check authorization
    const post = await this.postRepo.get(validId);
    if (!post) throw new NotFoundError("Post not found");
    if (post.userId !== validUser.id)
      throw new ForbiddenError("You are not allowed to delete this post");

    return this.postRepo.delete(validId, user);
  }

  async getCategory(postId: string): Promise<CategoryDTO | null> {
    const validPostId = this.getValidId(postId);
    return this.postRepo.getCategoryByPostId(validPostId);
  }

  //**** End of Class *****/
}
