import {UserAdapter } from "src/user/application/adapterdriver/adapter";
import { UserDatabase } from "src/user/infrastructure/database";


const database = new UserDatabase();
export const UserService = new UserAdapter(database);
export type { JwtUser } from "src/user/application/types/jwt";
export  { UserCookies } from "src/user/application/types/cookies";
export  { ErrorUser, type createUser, type getUser, type User } from "src/user/domain/user";
