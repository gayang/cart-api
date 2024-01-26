import { z } from "zod";

import { UserSchema } from "../schemas/userSchemas";
import { IPermissionObj } from "./permission";
import { ROLE } from "../constants/roles";

export type TUserSchema = z.infer<typeof UserSchema>;

export type TUser = TUserSchema & {
  _id: string;
  permission: string[] | IPermissionObj[];
};

export type TRole = keyof typeof ROLE;
