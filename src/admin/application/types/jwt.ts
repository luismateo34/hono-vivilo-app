import { Admin } from "src/admin/domain/admin";

export type jwtAdminPayload = Pick<Admin, "name" | "Admin_id"> & {
  role: "admin";
  exp: number;
  iat: number;
};
