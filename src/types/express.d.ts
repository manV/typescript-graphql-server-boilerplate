import { User } from '../entity/User';

declare global {
  namespace Express {
    export interface Request {
      state: {
        user: User;
      };
    }
  }
}
