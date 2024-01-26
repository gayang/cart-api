import { z } from "zod";

import { PermissionSchema } from "../schemas/permissionSchema";

export type TPermissionSchema = z.infer<typeof PermissionSchema>;

export type TPermission = TPermissionSchema & { _id: string };

export interface IPermissionObj {
  name: string;
}

export type TPermissionResource =
  | "USERS"
  | "PRODUCTS"
  | "CATEGORIES"
  | "SIZES"
  | "PERMISSIONS";

export type TPermissionAction = "READ" | "CREATE" | "UPDATE" | "DELETE";

export type TUserPermission = `${TPermissionResource}_${TPermissionAction}`;
