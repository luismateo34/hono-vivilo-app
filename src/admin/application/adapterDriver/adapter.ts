import { FacadesAdmin } from "src/admin/domain/port/driverport";
import { UpdateAdminAdapter } from "./method/updateAdmin";
import { DeleteAdminAdapter } from "./method/deleteAdmin";
import { FindAdminAdapter } from "./method/FindAdmin";
import { CreateAdminAdapter } from "./method/createAdmin";
import { databaseAdminQuery } from "src/admin/domain/port/Driven_port";
import { createAdmin, getAdmin } from "../../domain/admin";
import { LoginAdapter } from "src/admin/application/adapterDriver/method/login";

export class facadesAdminAdapter implements FacadesAdmin {
  constructor(private readonly databaseAdminQuery: databaseAdminQuery) {}
  //---------------
  async login(admin: createAdmin): Promise<getAdmin | null> {
    return await new LoginAdapter(this.databaseAdminQuery).login(admin);
  }
  //---------------
  async deleteAdmin(admin_id: number): Promise<boolean> {
    return await new DeleteAdminAdapter(this.databaseAdminQuery).deleteAdmin(
      admin_id,
    );
  }
  //-------------------------
  async find_byEmail(email: string): Promise<getAdmin | null> {
    return await new FindAdminAdapter(this.databaseAdminQuery).find_byEmail(
      email,
    );
  }
  //---------------
  async find_byId(admin_id: number): Promise<getAdmin | null> {
    return await new FindAdminAdapter(this.databaseAdminQuery).find_byId(
      admin_id,
    );
  }
  //---------------------
  async createAdmin(admin: createAdmin): Promise<getAdmin | null> {
    return await new CreateAdminAdapter(this.databaseAdminQuery).createAdmin(
      admin,
    );
  }
  //---------------------
  async update(admin_id: number, admin: createAdmin): Promise<getAdmin | null> {
    return await new UpdateAdminAdapter(this.databaseAdminQuery).update(
      admin_id,
      admin,
    );
  }
}
