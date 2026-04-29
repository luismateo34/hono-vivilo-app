import type { FindAdmin } from "src/admin/domain/port/driverport";
import { databaseAdminQuery } from "src/admin/domain/port/Driven_port";
import type { getAdmin } from "src/admin/domain/admin";
import { Email, Id_admin } from "src/admin/application/filter";
//---------------------------
export class FindAdminAdapter implements FindAdmin {
  constructor(private readonly databaseAdminQuery: databaseAdminQuery) {}
  async find_byId(admin_id: number): Promise<getAdmin | null> {
    try {
      Id_admin.parse({ id: admin_id });
      return await this.databaseAdminQuery.findbyId(admin_id);
    } catch {
      return null;
    }
  }
  //----------------------------------
  async find_byEmail(email: string): Promise<getAdmin | null> {
    try {
      Email.parse({ email });
      return await this.databaseAdminQuery.findbyEmail(email);
    } catch {
      return null;
    }
  }
}
