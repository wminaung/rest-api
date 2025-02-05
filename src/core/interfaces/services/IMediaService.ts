import { MediaDTO } from "../../../dtos/MediaDTO";
import {
  CreateMediaSchema,
  UpdateMediaSchema,
} from "../../../schemas/mediaSchema";
import { ICreate, IDelete, IGet, IGetAll, IUpdate } from "../repo/IBaseRepo";

export interface IMediaService
  extends ICreate<MediaDTO, CreateMediaSchema>,
    IGetAll<MediaDTO>,
    IGet<MediaDTO>,
    IUpdate<MediaDTO, UpdateMediaSchema>,
    IDelete<MediaDTO> {}
