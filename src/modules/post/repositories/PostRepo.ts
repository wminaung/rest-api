import { PrismaClient } from "@prisma/client";
import { CategoryDTO } from "../../../dtos/CategoryDTO";
import { CommentDTO } from "../../../dtos/CommentDTO";
import { LikeDTO } from "../../../dtos/LikeDTO";
import { PostDTO } from "../../../dtos/PostDTO";
import { TagDTO } from "../../../dtos/TagDTO";
import {
  CreatePostSchema,
  UpdatePostSchema,
} from "../../../shared/schemas/postSchema";
import { Repository } from "../../../shared/abstracts/Repository";
import { NotFoundError } from "../../../shared/errors";
import { IPostRepo } from "../interfaces/IPostRepo";

export class PostRepo extends Repository implements IPostRepo {
  private static instance: PostRepo;

  public static getInstance(prisma: PrismaClient): PostRepo {
    if (!PostRepo.instance) {
      PostRepo.instance = new PostRepo(prisma);
    }
    return PostRepo.instance;
  }

  constructor(private prisma: PrismaClient) {
    super();
  }

  async getAll(): Promise<PostDTO[]> {
    return this.executePrismaQueryOrThrow(
      () => this.prisma.post.findMany(),
      `something went wrong`
    );
  }

  async get(id: string): Promise<PostDTO | null> {
    return this.prisma.post.findUnique({ where: { id } });
  }

  async create(data: CreatePostSchema): Promise<PostDTO> {
    return this.executePrismaQueryOrThrow(
      () => this.prisma.post.create({ data }),
      `post not found `
    );
  }

  async update(id: string, data: UpdatePostSchema): Promise<PostDTO> {
    return this.executePrismaQueryOrThrow(
      () => this.prisma.post.update({ where: { id }, data }),
      `post cannot update`
    );
  }

  async delete(id: string): Promise<PostDTO> {
    const post = await this.get(id);
    if (!post) {
      throw new NotFoundError("Post not found");
    }
    return this.executePrismaQueryOrThrow(
      () => this.prisma.post.delete({ where: { id } }),
      `post cannot delete`
    );
  }

  // note: By-Methods
  async getPostsByUserId(userId: string): Promise<PostDTO[]> {
    return this.executePrismaQueryOrThrow(
      () => this.prisma.post.findMany({ where: { userId: userId } }),
      `something went wrong in getPostsByUserId`
    );
  }

  async getCategoryByPostId(id: string): Promise<CategoryDTO | null> {
    const aaa = await this.prisma.category.findFirst({
      where: {
        posts: {
          some: {
            id: id,
          },
        },
      },
    });
    return aaa;
  }

  async getCommentsByPostId(id: string): Promise<CommentDTO[]> {
    throw new Error("Method not implemented.");
  }

  async getLikesByPostId(id: string): Promise<LikeDTO[]> {
    throw new Error("Method not implemented.");
  }

  async getTagsByPostId(id: string): Promise<TagDTO[]> {
    throw new Error("Method not implemented.");
  }

  //** end Class */
}
