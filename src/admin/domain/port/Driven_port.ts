import type { getAdmin, createAdmin, Admin } from "src/admin/domain/admin";

export interface databaseAdminQuery {
  createAdmin: (admin: createAdmin) => Promise<getAdmin | null>;
  findbyId: (admin_id: number) => Promise<getAdmin | null>;
  findbyEmail: (email: string) => Promise<getAdmin | null>;
  update: (admin_id: number, admin: createAdmin) => Promise<getAdmin | null>;
  deleteAdminByID: (admin_id: number) => Promise<boolean>;
  login: (name:string, email: string) => Promise<Admin | null>;
}
