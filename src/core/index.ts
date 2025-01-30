import { createCategoryController } from "./categoryControllerFactory";
import { createUserController } from "./userControllerFactory";

export const userController = createUserController();
export const categoryController = createCategoryController();
