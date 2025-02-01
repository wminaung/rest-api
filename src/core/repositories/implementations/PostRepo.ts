import { PrismaClient } from "@prisma/client";
import { Repository } from "../Repository";
import { IPostRepo } from "../interfaces/IPostRepo";
import { PostDTO } from "../../dtos/PostDTO";
import { CreatePostSchema, UpdatePostSchema } from "../../schemas/postSchema";
import { NotFoundError } from "../../../errors";

export class PostRepo extends Repository implements IPostRepo {
  constructor(private prisma: PrismaClient) {
    super();
  }
  async getAll(): Promise<PostDTO[]> {
    return this.executePrismaQuery(
      () => this.prisma.post.findMany(),
      `something went wrong`
    );
  }

  async get(id: string): Promise<PostDTO | null> {
    return this.prisma.post.findUnique({ where: { id } });
  }

  async create(data: CreatePostSchema): Promise<PostDTO> {
    return this.executePrismaQuery(
      () => this.prisma.post.create({ data }),
      `post not found`
    );
  }

  async update(id: string, data: UpdatePostSchema): Promise<PostDTO> {
    return this.executePrismaQuery(
      () => this.prisma.post.update({ where: { id }, data }),
      `post cannot update`
    );
  }

  async delete(id: string): Promise<PostDTO> {
    const post = await this.get(id);
    if (!post) {
      throw new NotFoundError("Post not found");
    }
    return this.executePrismaQuery(
      () => this.prisma.post.delete({ where: { id } }),
      `post cannot delete`
    );
  }
}
