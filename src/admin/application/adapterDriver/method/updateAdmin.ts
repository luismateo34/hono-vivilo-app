import type { UpdateAdmin } from "src/admin/domain/port/driverport";
import { databaseAdminQuery } from "src/admin/domain/port/Driven_port";
import type { createAdmin, getAdmin } from "src/admin/domain/admin";
import {
  Id_admin,
  CreateAdmin as createfilt,
} from "src/admin/application/filter";
import { hashPassword } from "src/utils/criptUtils";
//----------------------------------------
export class UpdateAdminAdapter implements UpdateAdmin {
  constructor(private readonly databaseAdminQuery: databaseAdminQuery) {}
  async update(admin_id: number, admin: createAdmin): Promise<getAdmin | null> {
    try {
      Id_admin.parse({ id: admin_id});
      createfilt.parse(admin);
      const hashPass = await hashPassword(admin.password);
      const objAdmin: createAdmin = { ...admin, password: hashPass };
      const adminupdate = await this.databaseAdminQuery.update(admin_id, objAdmin);
      return adminupdate;
    } catch {
      return null;
    }
  }
}
