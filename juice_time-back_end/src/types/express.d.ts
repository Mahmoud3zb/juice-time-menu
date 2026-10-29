import { UserToken } from "../interfaces/user-token";

declare global {
  namespace Express {
    interface Request {
      user?: UserToken;
    }
  }
}

export {};
