import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { JwtManager } from "../../helpers/JwtManager";
import { UnauthorizedError } from "../../errors";
import { Controller } from "./Controller";
import { CreateUserSchema } from "../../schemas/userSchema";

export class AuthController extends Controller {
  constructor(private authService: AuthService) {
    super();
  }

  // Register new user
  async register(req: Request<{}, {}, CreateUserSchema>, res: Response) {
    try {
      const userData = req.body;
      const user = await this.authService.register(userData);
      this.sendCreated(res, user);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  // Login - generate both Access and Refresh tokens
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await this.authService.login(
        email,
        password
      );
      this.sendOk(res, { accessToken, refreshToken });
    } catch (error) {
      this.handleError(error, res);
    }
  }

  // Logout - Placeholder, ideally should invalidate the refresh token
  async logout(req: Request<{}, {}, { refreshToken: string }>, res: Response) {
    try {
      const refreshToken = req.body.refreshToken;
      if (!refreshToken) {
        throw new UnauthorizedError("refreshToken is required");
      }

      await this.authService.logout(refreshToken);
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      this.handleError(error, res);
    }
  }

  // Refresh Access Token using Refresh Token
  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const { accessToken } = await this.authService.refreshAccessToken(
        refreshToken
      );
      res.json({ accessToken, refreshToken });
    } catch (error) {
      this.handleError(error, res);
    }
  }
}
