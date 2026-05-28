import { CreateAdmin } from "src/admin/domain/port/driverport";
import { databaseAdminQuery } from "src/admin/domain/port/Driven_port";
import type { getAdmin, createAdmin } from "src/admin/domain/admin";
import { CreateAdmin as createfilter } from "src/admin/application/filter";
import { hashPassword } from "src/utils/criptUtils";
//----------------------------
export class CreateAdminAdapter implements CreateAdmin {
  constructor(private readonly databaseAdminQuery: databaseAdminQuery) {}
  async createAdmin(admin: createAdmin): Promise<getAdmin | null> {
    try {
      createfilter.parse(admin);
      //----si existe un admin con el mail-------------------------
      const isExist = await this.databaseAdminQuery.findbyEmail(admin.email);
      if (isExist?.email === admin.email) {
        return null;
      }
      //-----------------------------|
      const hashPass = await hashPassword(admin.password);
      const newadmin: createAdmin = { ...admin, password: hashPass };
      const Admincreate = await this.databaseAdminQuery.createAdmin(newadmin);
      return Admincreate;
    } catch {
      return null;
    }
  }
}
