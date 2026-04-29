import { DeleteAdmin } from "src/admin/domain/port/driverport";
import { databaseAdminQuery } from "src/admin/domain/port/Driven_port";
import { Id_admin } from "src/admin/application/filter";

//--------------------------------------------
export class DeleteAdminAdapter implements DeleteAdmin {
  constructor(private readonly databaseAdminQuery: databaseAdminQuery) {}
  async deleteAdmin(admin_id: number ): Promise<boolean> {
    try {
      Id_admin.parse({ id:admin_id});
      const deleted = await this.databaseAdminQuery.deleteAdminByID(admin_id);
      return deleted;
    } catch {
      return false;
    }
  }
}
