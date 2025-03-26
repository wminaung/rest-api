import { PrismaClient } from "@prisma/client";
import { TagDTO } from "../../../dtos/TagDTO";
import { Repository } from "../../../shared/abstracts/Repository";
import { JwtAuthPayload } from "../../../shared/types/jwtAuthPayload";
import { ITagRepo } from "../interfaces/ITagRepo";

export class TagRepo extends Repository implements ITagRepo {
  private static instance: TagRepo;

  public static getInstance(prisma: PrismaClient): TagRepo {
    if (!TagRepo.instance) {
      TagRepo.instance = new TagRepo(prisma);
    }
    return TagRepo.instance;
  }

  constructor(private prisma: PrismaClient) {
    super();
  }

  create(data: { name: string }): Promise<TagDTO> {
    return this.executePrismaQueryOrThrow(
      () => this.prisma.tag.create({ data }),
      "Error creating tag"
    );
  }
  getAll(): Promise<TagDTO[]> {
    throw new Error("Method not implemented.");
  }
  get(id: string): Promise<TagDTO | null> {
    throw new Error("Method not implemented.");
  }
  update(
    id: string,
    data: { name?: string | undefined },
    user?: JwtAuthPayload
  ): Promise<TagDTO> {
    throw new Error("Method not implemented.");
  }
  delete(id: string, user?: JwtAuthPayload): Promise<TagDTO> {
    throw new Error("Method not implemented.");
  }
}
