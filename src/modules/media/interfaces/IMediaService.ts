import { MediaDTO } from "../../../dtos/MediaDTO";
import {
  CreateMediaSchema,
  UpdateMediaSchema,
} from "../../../shared/schemas/mediaSchema";
import {
  ICreate,
  IDelete,
  IGet,
  IGetAll,
  IUpdate,
} from "../../../shared/interfaces/crud.interfaces";

export interface IMediaService
  extends ICreate<MediaDTO, CreateMediaSchema>,
    IGetAll<MediaDTO>,
    IGet<MediaDTO>,
    IUpdate<MediaDTO, UpdateMediaSchema>,
    IDelete<MediaDTO> {}
