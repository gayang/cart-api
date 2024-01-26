import users from "./usersData";
import authService from "../../services/authService";
import { TUserPermission } from "permission";

export async function loginUserByPermission(...permissions: TUserPermission[]) {
  const userData = users[0];
  userData.permission = permissions.map((permission) => ({ name: permission }));
  const accessToken = await authService.generateAccessToken(userData);
  return accessToken;
}
