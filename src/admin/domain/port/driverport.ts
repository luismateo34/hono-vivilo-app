import type { getAdmin, createAdmin } from "src/admin/domain/admin";

//-----------------------------
export interface Loggin {
   login: (admin: createAdmin) => Promise<getAdmin | null>;
}
//-----------------------------
export interface CreateAdmin {
  createAdmin: (admin: createAdmin) => Promise<getAdmin | null>;
}
//-----------------------------
export interface FindAdmin {
  find_byId: (admin_id: number) => Promise<getAdmin | null>;
  find_byEmail: (email: string) => Promise<getAdmin | null>;
}
//-----------------------------
export interface UpdateAdmin {
  update: (admin_id: number, admin: createAdmin) => Promise<getAdmin | null>;
}
//-----------------------------
export interface DeleteAdmin {
  deleteAdmin: (admin_id: number) => Promise<boolean>;
}
//-----------------------------
export interface FacadesAdmin
  extends
    CreateAdmin,
    FindAdmin,
    UpdateAdmin,
    Loggin,
    DeleteAdmin {}
