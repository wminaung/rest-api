import bcrypt from "bcrypt";
export class PasswordHasher {
  constructor(private saltRounds: number = 10) {}
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
