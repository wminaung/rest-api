import { TagDTO } from "../../../dtos/TagDTO";
import {
  CreateTagSchema,
  UpdateTagSchema,
} from "../../../shared/schemas/tagSchema";
import {
  ICreate,
  IDelete,
  IGet,
  IGetAll,
  IUpdate,
} from "../../../shared/interfaces/crud.interfaces";

export interface ITagRepo
  extends ICreate<TagDTO, CreateTagSchema>,
    IGetAll<TagDTO>,
    IGet<TagDTO>,
    IUpdate<TagDTO, UpdateTagSchema>,
    IDelete<TagDTO> {}
