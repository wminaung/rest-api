import bcrypt from "bcrypt";

export class PasswordHasher {
  private static instance: PasswordHasher;
  public static getInstance(saltRounds: number = 10): PasswordHasher {
    if (!PasswordHasher.instance) {
      PasswordHasher.instance = new PasswordHasher(saltRounds);
    }
    return PasswordHasher.instance;
  }

  constructor(private saltRounds: number = 10) {}
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
export const passwordHasher = PasswordHasher.getInstance(10);
