import { ZodError } from "zod";
import { UserController } from "../../../src/core/controllers/UserController";
import { IUserRepo } from "../../../src/core/repositories/interfaces/IUserRepo";
import { UserService } from "../../../src/core/services/UserService";
import {
  userMockRequest,
  userMockResponse,
} from "../../__mocks___/request-response/users.mock";
import {
  InternalServerError,
  NotFoundError,
  UnexpectedError,
  ValidationError,
} from "../../../src/errors";
import { ErrorCode } from "../../../src/enums/ErrorCode";
import { PasswordHasher } from "../../../src/helpers/PasswordHasher";
import { CreateUserSchema } from "../../../src/schemas/userSchema";
import { ErrorFormatter } from "../../../src/helpers/ErrorFormatter";

class MockUserRepo implements IUserRepo {
  getAllUsers = jest.fn();
  getUserById = jest.fn();
  createUser = jest.fn();
  updateUser = jest.fn();
  deleteUser = jest.fn();
}

describe("UserController", () => {
  let userController: UserController;
  let userRepo: MockUserRepo;
  let userService: UserService;
  let passwordHasher: PasswordHasher;
  beforeEach(() => {
    userRepo = new MockUserRepo();
    passwordHasher = new PasswordHasher(10);
    userService = new UserService(userRepo, passwordHasher);
    userController = new UserController(userService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    //? success 201 when valid data
    it("should create a new user status 201", async () => {
      const user = {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
      };
      const createUserData: CreateUserSchema = {
        name: "John Doe",
        email: "john@example.com",
        password: "Password123@",
        role: "ADMIN",
      };
      const mockRequest = userMockRequest.create(createUserData);
      const mockResponse = userMockResponse.create();

      userRepo.createUser.mockResolvedValue(user);
      userService.createUser(createUserData, { role: "ADMIN" } as any);
      await userController.createUser(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ ...user });
    });

    //? fail 400 when data is not valid
    it("should handle error status 400", async () => {
      const createUserData: CreateUserSchema = {
        name: "John Doe",
        email: "john@example.com",
        password: "Password123@",
        role: "ADMIN",
      };

      const mockZodError = new ZodError([]);
      const error = new ValidationError(mockZodError);
      userRepo.createUser.mockRejectedValue(error);

      const mockRequest = userMockRequest.create(createUserData);
      const mockResponse = userMockResponse.create();

      await userController.createUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        ErrorFormatter.formatErrorResponse(error)
      );
    });

    //******* end createUser
  });

  describe("getAllUsers", () => {
    //? success 200 when db is ok
    it("should get all users status 200", async () => {
      const mockRequest = userMockRequest.getAll();
      const mockResponse = userMockResponse.getAll();
      const users = [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
        },
      ];

      userRepo.getAllUsers.mockResolvedValue(users);

      await userController.getAllUsers(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(users);
    });

    //? fail 500 when something was wrong in db
    it("should handle error status 500", async () => {
      const mockRequest = userMockRequest.getAll();
      const mockResponse = userMockResponse.getAll();
      const error = new InternalServerError();
      userRepo.getAllUsers.mockRejectedValue(error);

      await userController.getAllUsers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith(
        ErrorFormatter.formatErrorResponse(error)
      );
    });
    //******* end getAllUsers
  });

  describe("getUserById", () => {
    //? success 200 when valid id & has user
    it("should return user object with status 200 ", async () => {
      const user = {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
      };
      const mockRequest = userMockRequest.getById(user.id);

      const mockResponse = userMockResponse.getById();

      userRepo.getUserById.mockResolvedValue(user);
      await userController.getUserById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(user);
    });

    //? not found 404 when user not found
    it("should handle error status 404 ", async () => {
      const user = {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
      };
      const mockRequest = userMockRequest.getById(user.id);
      const mockResponse = userMockResponse.getById();

      const error = new NotFoundError();
      userRepo.getUserById.mockRejectedValue(error);
      await userController.getUserById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith(
        ErrorFormatter.formatErrorResponse(error)
      );
    });

    //? fail validation 400 when valid id does not provide
    it("should handle error status 400 ", async () => {
      const mockRequest = userMockRequest.getById("2");
      const mockResponse = userMockResponse.getById();
      const error = new ValidationError(new ZodError([]));

      userRepo.getUserById.mockRejectedValue(error);
      await userController.getUserById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        ErrorFormatter.formatErrorResponse(error)
      );
    });

    //******* end getUserById
  });

  describe("updateUser", () => {
    //? success 200
    it("should update user status 200 ", async () => {
      const expectedUser = {
        id: "1",
        name: "John John",
        email: "johnjohn@example.com",
      };
      const { id, ...valueToUpdate } = expectedUser;

      const mockRequest = userMockRequest.update(
        expectedUser.id,
        valueToUpdate
      );
      const mockResponse = userMockResponse.update();
      userRepo.updateUser.mockResolvedValue({
        id: "1",
        name: "John John",
        email: "johnjohn@example.com",
      });
      await userController.updateUser(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedUser);
    });

    //? fail 404 when user not found
    it("should handle error status 404", async () => {
      const valueToUpdate = {
        name: "John John",
        email: "johnjohn@example.com",
      };
      const error = new NotFoundError();
      userRepo.updateUser.mockRejectedValue(error);
      const mockRequest = userMockRequest.update("2", valueToUpdate);
      const mockResponse = userMockResponse.update();
      await userController.updateUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith(
        ErrorFormatter.formatErrorResponse(error)
      );
    });

    //? fail 400 when valid id & invalid data
    it("should handle error status 400 ", async () => {
      const expectedUser = {
        id: "1",
        name: "John John",
        email: "johnjohn@example.com",
      };
      const { id, ...valueToUpdate } = expectedUser;
      const error = new ValidationError(new ZodError([]));

      userRepo.updateUser.mockRejectedValue(error);

      const mockRequest = userMockRequest.update(
        expectedUser.id,
        valueToUpdate
      );

      const mockResponse = userMockResponse.update();

      await userController.updateUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        ErrorFormatter.formatErrorResponse(error)
      );
    });

    //******* end updateUser
  });

  describe("deleteUser", () => {
    //? success 200 when valid id & user found
    it("should delete user with status 200", async () => {
      const expectedUser = {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
      };
      userRepo.deleteUser.mockResolvedValue(expectedUser);

      const mockRequest = userMockRequest.delete(expectedUser.id);
      const mockResponse = userMockResponse.delete();

      await userController.deleteUser(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedUser);
    });

    //? fail 404 when valid id but user not found
    it("should handle error with status 404", async () => {
      const error = new NotFoundError("User Not found!");
      userRepo.deleteUser.mockRejectedValue(error);

      const mockRequest = userMockRequest.delete("3"); // user not found for this id
      const mockResponse = userMockResponse.delete();

      await userController.deleteUser(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          message: `User Not found!`,
          code: ErrorCode.NOT_FOUND,
          status: 404,
        },
      });
    });

    //? fail 400 when invalid id
    it("should handle error with status 400", async () => {
      const error = new ValidationError(new ZodError([]));
      userRepo.deleteUser.mockRejectedValue(error);

      const mockRequest = userMockRequest.delete("3");
      const mockResponse = userMockResponse.delete();

      await userController.deleteUser(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        ErrorFormatter.formatErrorResponse(error)
      );
    });

    //? fail 500 when something wrong in db
    it("should throw error with status 500", async () => {
      const error = new UnexpectedError();
      userRepo.deleteUser.mockRejectedValue(error);

      const mockRequest = userMockRequest.delete("3");
      const mockResponse = userMockResponse.delete();

      await userController.deleteUser(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(error.status);
      expect(mockResponse.json).toHaveBeenCalledWith(
        ErrorFormatter.formatErrorResponse(error)
      );
    });

    //******* end deleteUser
  });

  //******* UserController
});
