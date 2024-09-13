import { Role } from "../module/users/user.constant";

interface AuthUser {
  id: string;
  email: string;
  role: keyof typeof Role;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser; 
    }
  }
}
