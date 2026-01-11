import { User } from "../../api/domain/auth/auth.types";

export interface GlobalSlice {
  token?: string;
  user?: User;
}

