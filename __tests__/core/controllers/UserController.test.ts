import { UserController } from "../../../src/core/controllers/UserController";
import { Request, Response } from "express";
import { IUserRepo } from "../../../src/core/repositories/interfaces/IUserRepo";
import { UserService } from "../../../src/core/services/UserService";
import {
  createUserSchema,
  CreateUserSchema,
} from "../../../src/core/schemas/userSchema";
import {
  userMockRequest,
  userMockResponse,
} from "../../__mocks___/request-response/users";

const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@example.com",
  },
];

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
    // success 201
    it("should return user object", async () => {
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

    //fail 500
    it("should return error", async () => {
      const createUserData = {
        name: "John Doe",
        email: "john@example.com",
        password: "password",
      };
      const mockRequest = userMockRequest.create(createUserData);

      const mockResponse = userMockResponse.create();

      userRepo.createUser.mockRejectedValue(new Error("Error creating user"));

      await userController.createUser(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Error creating user",
      });
    });
  });

  describe("getAllUsers", () => {
    // success 200

    it("should return user array", async () => {
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

    // fail 500
    it("should throw status 500 when something was wrong", async () => {
      const mockRequest = userMockRequest.getAll();
      const mockResponse = userMockResponse.getAll();
      userRepo.getAllUsers.mockRejectedValue(new Error("Database error"));

      // Call the controller
      await userController.getAllUsers(mockRequest, mockResponse);

      // Expect the response to be a 500 error with the error message
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Database error",
      });
    });
    // end getAllUsers
  });

  describe("getUserById", () => {
    // success 200
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

    // not found 404
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

    // fail bad request 400
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

    // end getUserById
  });

  describe("updateUser", () => {
    // success 200
    it("should update user when valid data and valid id provided ", async () => {
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

      const mockRequest = userMockRequest.update(
        expectedUser.id,
        valueToUpdate
      );
      const mockResponse = userMockResponse.update();
      mockResponse.json = jest.fn().mockImplementation((data) => {
        console.log(data);
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

    // end updateUser
  });

  //end UserController
});
