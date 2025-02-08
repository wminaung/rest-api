import { LikeDTO } from "../../../dtos/LikeDTO";
import { ILikeRepo } from "../interfaces/ILikeRepo";
import { Repository } from "../../../shared/abstracts/Repository";
import { CreateLikeSchema } from "../../../shared/schemas/likeSchema";
import { PrismaClient } from "@prisma/client";

export class LikeRepo extends Repository implements ILikeRepo {
  constructor(private prisma: PrismaClient) {
    super();
  }

  create(data: CreateLikeSchema): Promise<LikeDTO> {
    return this.executePrismaQueryOrThrow(
      () => this.prisma.like.create({ data }),
      "Error creating like"
    );
  }
  getAll(): Promise<LikeDTO[]> {
    return this.executePrismaQueryOrThrow(
      () => this.prisma.like.findMany({ orderBy: { id: "asc" } }),
      "Error getting all likes"
    );
  }
  get(id: string): Promise<LikeDTO | null> {
    return this.executePrismaQueryOrThrow(
      () => this.prisma.like.findUnique({ where: { id } }),
      "Error get like by id"
    );
  }
  delete(id: string): Promise<LikeDTO> {
    return this.executePrismaQueryOrThrow(
      () => this.prisma.like.delete({ where: { id } }),
      "Error delete like"
    );
  }
}
