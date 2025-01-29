import { ZodError } from "zod";
import { UserController } from "../../../src/core/controllers/UserController";
import { IUserRepo } from "../../../src/core/repositories/interfaces/IUserRepo";
import { UserService } from "../../../src/core/services/UserService";
import {
  userMockRequest,
  userMockResponse,
} from "../../__mocks___/request-response/users";
import { NotFoundError } from "../../../src/errors";

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
  beforeEach(() => {
    userRepo = new MockUserRepo();
    userService = new UserService(userRepo);
    userController = new UserController(userService);
  });

  describe("createUser", () => {
    //? success 201 when valid data
    it("should return user object with status 201 when valid data", async () => {
      const user = {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
      };
      const createUserData = {
        name: "John Doe",
        email: "john@example.com",
        password: "password",
      };
      const mockRequest = userMockRequest.create(createUserData);
      const mockResponse = userMockResponse.create();

      userRepo.createUser.mockResolvedValue(user);

      await userController.createUser(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ ...user });
    });

    //? fail 400 when data is not valid
    it("should throw  error when data is not valid", async () => {
      const createUserData = {
        name: "Joh",
        email: "john@m",
        password: "pas",
      };
      const mockRequest = userMockRequest.create(createUserData);

      const mockResponse = userMockResponse.create();

      userRepo.createUser.mockRejectedValue(new ZodError([]));

      await userController.createUser(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: expect.any(String),
      });
    });

    //******* end createUser
  });

  describe("getAllUsers", () => {
    //? success 200 when db is ok
    it("should return user array when db is ok", async () => {
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
    it("should throw status 500 when something was wrong in db", async () => {
      const mockRequest = userMockRequest.getAll();
      const mockResponse = userMockResponse.getAll();
      userRepo.getAllUsers.mockRejectedValue(new Error("Database error"));

      await userController.getAllUsers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: expect.any(String),
      });
    });
    //******* end getAllUsers
  });

  describe("getUserById", () => {
    //? success 200 when valid id & has user
    it("should return user object when has user object and valid user id provided", async () => {
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
    it("should status 404 when user not found", async () => {
      const user = {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
      };
      const mockRequest = userMockRequest.getById(user.id);

      const mockResponse = userMockResponse.getById();
      mockResponse.json = jest.fn().mockImplementation((data) => {
        data.message = "User not found";
        return data;
      });

      userRepo.getUserById.mockResolvedValue(null);
      await userController.getUserById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User not found",
      });
    });

    //? fail bad request 400 when valid id does not provide
    it("should throw status 400 when valid id does not provide", async () => {
      const mockRequest = userMockRequest.getById({} as string); // invalid id
      const mockResponse = userMockResponse.getById();
      mockResponse.json = jest.fn().mockImplementation((data) => {
        data.message = "Invalid id or valid id not provided";
        return data;
      });
      await userController.getUserById(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Invalid id or valid id not provided",
      });
    });

    //******* end getUserById
  });

  describe("updateUser", () => {
    //? success 200
    it("should update user when valid data and valid id provided ", async () => {
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
      mockResponse.json = jest.fn().mockImplementation((data) => {
        return data;
      });
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
    it("should throw status 404 when user not found", async () => {
      const user = {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
      };

      const expectedUser = {
        id: "1",
        name: "John John",
        email: "johnjohn@example.com",
      };
      const { id, ...valueToUpdate } = expectedUser;
      userRepo.updateUser.mockResolvedValue(user);
      const mockRequest = userMockRequest.update("2", valueToUpdate);
      const mockResponse = userMockResponse.update();

      mockResponse.json = jest.fn().mockImplementation((data) => {
        data.message = "User not found";
        return data;
      });

      await userController.getUserById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "User not found",
      });
    });

    //? fail 400 when valid id & invalid data
    it("should throw  error when invalid data", async () => {
      const invalidUserData = {
        name: "J",
        email: "john",
      };
      const expectedUser = {
        id: "1",
        name: "John John",
        email: "johnjohn@example.com",
      };
      userRepo.updateUser.mockRejectedValue(new ZodError([]));
      const mockRequest = userMockRequest.update(
        expectedUser.id,
        invalidUserData
      );

      const mockResponse = userMockResponse.update();

      await userController.updateUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: expect.any(String),
      });
    });

    //? fail 400 when invalid id & valid data
    it("should throw error when invalid user id is provided", async () => {
      const user = {
        id: "", // invalid id
        name: "John Doe",
        email: "john@example.com",
      };
      const expectedUser = {
        id: "1",
        name: "John John",
        email: "johnjohn@example.com",
      };
      const { id, ...valueToUpdate } = expectedUser;
      userRepo.updateUser.mockRejectedValue(new ZodError([]));
      const mockRequest = userMockRequest.update(user.id, valueToUpdate);

      const mockResponse = userMockResponse.update();

      await userController.updateUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: expect.any(String),
      });
    });

    //? fail 404 when valid id
    it("should throw error when invalid user id is provided", async () => {
      const expectedUser = {
        id: "1",
        name: "John John",
        email: "johnjohn@example.com",
      };
      const { id, ...valueToUpdate } = expectedUser;
      userRepo.updateUser.mockRejectedValue(new NotFoundError());
      const mockRequest = userMockRequest.update("3", valueToUpdate);

      const mockResponse = userMockResponse.update();

      await userController.updateUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: expect.any(String),
      });
    });

    //******* end updateUser
  });

  describe("deleteUser", () => {
    //? success 200 when valid id & user found
    it("should delete user with status 200 when valid id is provided", async () => {
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
    it("should throw error with status 404 when valid id is provided but user not found", async () => {
      const expectedUser = {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
      };
      userRepo.deleteUser.mockRejectedValue(new NotFoundError());

      const mockRequest = userMockRequest.delete("3"); // user not found for this id
      const mockResponse = userMockResponse.delete();
      mockResponse.json = jest.fn().mockImplementation((data) => {
        return data;
      });

      await userController.deleteUser(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).not.toHaveBeenCalledWith(expectedUser);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: expect.any(String),
      });
    });

    //? fail 400 when invalid id
    it("should throw error with status 400 when invalid id is provided", async () => {
      const expectedUser = {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
      };
      userRepo.deleteUser.mockResolvedValue(expectedUser);

      const mockRequest = userMockRequest.delete("");
      const mockResponse = userMockResponse.delete();

      await userController.deleteUser(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).not.toHaveBeenCalledWith(expectedUser);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: expect.any(String),
      });
    });

    //? fail 500 when something wrong in db
    it("should throw error with status 500 when something wrong in db", async () => {
      const expectedUser = {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
      };
      userRepo.deleteUser.mockRejectedValue(new Error());

      const mockRequest = userMockRequest.delete(expectedUser.id);
      const mockResponse = userMockResponse.delete();

      await userController.deleteUser(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).not.toHaveBeenCalledWith(expectedUser);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: expect.any(String),
      });
    });

    //******* end deleteUser
  });

  //******* UserController
});
