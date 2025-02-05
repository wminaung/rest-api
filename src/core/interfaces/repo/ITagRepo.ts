import { TagDTO } from "../../../dtos/TagDTO";
import { CreateTagSchema, UpdateTagSchema } from "../../../schemas/tagSchema";
import { ICreate, IDelete, IGet, IGetAll, IUpdate } from "./IBaseRepo";

export interface ITagRepo
  extends ICreate<TagDTO, CreateTagSchema>,
    IGetAll<TagDTO>,
    IGet<TagDTO>,
    IUpdate<TagDTO, UpdateTagSchema>,
    IDelete<TagDTO> {}
