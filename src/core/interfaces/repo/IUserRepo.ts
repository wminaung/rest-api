import { UserDTO } from "../../../dtos/UserDTO";
import {
  CreateUserSchema,
  UpdateUserSchema,
} from "../../../schemas/userSchema";
import { ICreate, IDelete, IGet, IGetAll, IUpdate } from "./IBaseRepo";

export interface IUserRepo
  extends ICreate<UserDTO, CreateUserSchema>,
    IGetAll<UserDTO>,
    IGet<UserDTO>,
    IUpdate<UserDTO, UpdateUserSchema>,
    IDelete<UserDTO> {}
