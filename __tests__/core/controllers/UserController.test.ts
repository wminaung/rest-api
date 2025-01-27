import { UserController } from "../../../src/core/controllers/UserController";
import { Request, Response } from "express";
import { IUserRepo } from "../../../src/core/repositories/IUserRepo";
import { UserService } from "../../../src/core/services/UserService";
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
  let mockRequest = {} as Request;

  let mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;

  let userController: UserController;
  let userRepo: MockUserRepo;
  let userService: UserService;
  beforeEach(() => {
    userRepo = new MockUserRepo();
    userService = new UserService(userRepo);
    userController = new UserController(userService);
  });
  beforeEach(() => {
    mockRequest.body = {};
    mockResponse.json = jest.fn().mockReturnThis();
    mockResponse.status = jest.fn().mockReturnThis();
  });

  describe("getAllUsers", () => {
    // success 200
    it("should return user array", async () => {
      const user = {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
      };

      mockRequest.body = {
        name: "John Doe",
        email: "john@example.com",
        password: "password",
      };

      userRepo.getAllUsers.mockResolvedValue([user]);

      await userController.getAllUsers(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith([user]);
    });

    //fail 500
    it("should return error", async () => {
      mockRequest.body = {
        name: "John Doe",
        email: "john@example.com",
        password: "password",
      };

      userRepo.createUser.mockRejectedValue(new Error("Error creating user"));

      await userController.createUser(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Error creating user",
      });
    });
  });

  describe("createUser", () => {
    // success 201
    it("should return user object", async () => {
      const user = {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
      };

      mockRequest.body = {
        name: "John Doe",
        email: "john@example.com",
        password: "password",
      };

      userRepo.createUser.mockResolvedValue(user);

      await userController.createUser(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ ...user });
    });

    //fail 500
    it("should return error", async () => {
      mockRequest.body = {
        name: "John Doe",
        email: "john@example.com",
        password: "password",
      };

      userRepo.createUser.mockRejectedValue(new Error("Error creating user"));

      await userController.createUser(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Error creating user",
      });
    });

    // fail 400
    it("should return error final", async () => {
      mockRequest.body = {
        name: "Jo",
        email: "john@example.com",
        password: "pas",
      };

      userRepo.createUser.mockRejectedValue(new Error("Error creating user"));
      await userController.createUser(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: expect.any(String),
      });
    });
  });
});
