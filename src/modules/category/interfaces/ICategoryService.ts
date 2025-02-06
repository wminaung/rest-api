import { CategoryDTO } from "../../../dtos/CategoryDTO";
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from "../../../shared/schemas/categorySchema";
import {
  ICreate,
  IDelete,
  IGet,
  IGetAll,
  IUpdate,
} from "../../../shared/interfaces/crud.interfaces";

export interface ICategoryService
  extends ICreate<CategoryDTO, CreateCategorySchema>,
    IGetAll<CategoryDTO>,
    IGet<CategoryDTO>,
    IUpdate<CategoryDTO, UpdateCategorySchema>,
    IDelete<CategoryDTO> {}
