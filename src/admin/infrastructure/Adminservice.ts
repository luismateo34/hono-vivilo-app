import { Database } from "./database";
import { facadesAdminAdapter } from "src/admin/application/adapterDriver/adapter";

const database = new Database()
export const AdminService = new facadesAdminAdapter(database);
export { adminCookies } from "src/admin/application/types/cookies"
export { type jwtAdminPayload } from "src/admin/application/types/jwt"
export type { getAdmin, createAdmin, Admin  } from "src/admin/domain/admin";
