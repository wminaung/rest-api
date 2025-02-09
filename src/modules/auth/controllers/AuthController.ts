import { Request, Response } from "express";
import { Controller } from "../../../shared/abstracts/Controller";
import { CreateUserSchema } from "../../../shared/schemas/userSchema";
import { UnauthorizedError } from "../../../shared/errors";
import { IAuthService } from "../interfaces/IAuthService";

export class AuthController extends Controller {
  private static instance: AuthController;
  public static getInstance(authService: IAuthService): AuthController {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController(authService);
    }
    return AuthController.instance;
  }

  constructor(private authService: IAuthService) {
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
  async logout(
    req: Request<{}, {}, { refreshToken: string; accessToken: string }>,
    res: Response
  ) {
    try {
      const refreshToken = req.body.refreshToken;
      const accessToken = req.body.accessToken;
      if (!refreshToken || !accessToken) {
        throw new UnauthorizedError(
          "refreshToken and accessToken are required"
        );
      }

      await this.authService.logout({ accessToken, refreshToken });
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
