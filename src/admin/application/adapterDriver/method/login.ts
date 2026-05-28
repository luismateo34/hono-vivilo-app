import { Loggin } from "src/admin/domain/port/driverport";
import { databaseAdminQuery } from "src/admin/domain/port/Driven_port";
import type { getAdmin, createAdmin } from "src/admin/domain/admin";
import { CreateAdmin as createfilter } from "src/admin/application/filter";
import { comparePassword } from "src/utils/criptUtils";
//----------------------------
export class LoginAdapter implements Loggin {
  constructor(private readonly databaseAdminQuery: databaseAdminQuery) {}
  async login(admin: createAdmin): Promise<getAdmin | null> {
    try {
      createfilter.parse(admin);
      const adminObj = await this.databaseAdminQuery.login(
        admin.name,
        admin.email,
      );
      if (adminObj?.email !== admin.email) {
        return null;
      }
      const hashPass = await comparePassword(
        admin.password,
        adminObj?.password,
      );
      if (!hashPass) {
        return null;
      }
      const respObj: getAdmin = {
        Admin_id: adminObj.Admin_id,
        email: adminObj.email,
        name: adminObj.name,
      };
      return respObj;
    } catch {
      return null;
    }
  }
}
