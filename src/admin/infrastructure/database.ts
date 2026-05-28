import { type databaseAdminQuery } from "src/admin/domain/port/Driven_port";
import { Admin, createAdmin, getAdmin } from "src/admin/domain/admin";
import { Adminschema } from "./adminschema";
import pino from "pino";

export class Database implements databaseAdminQuery {
  async deleteAdminByID(admin_id: number): Promise<boolean> {
    try {
     const resp =  await Adminschema.destroy({
        where: { Admin_id: admin_id },
      });
      if (resp === 0 ){
        throw new Error("error al eliminar el admin");
      }
      return true;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "deleteAdminByID" });
      logs.info(err.message ?? "error al eliminar el admin");
      return false;
    }
  }
  //--------------------------
  async createAdmin(admin: createAdmin): Promise<getAdmin | null> {
    try {
      const admincreate = await Adminschema.create(admin);
      const { name, Admin_id, email } = admincreate;
      const resp: getAdmin = {
        Admin_id,
        email,
        name,
      };
      return resp;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "createAdmin" });
      logs.info(err.message ?? "error registrando el admin");
      return null;
    }
  }
  //-------------------------
  async findbyEmail(email: string): Promise<getAdmin | null> {
    try {
      const findemail = await Adminschema.findOne({ where: { email: email } });
      if (findemail === null) {
        throw new Error("admin no encontrado");
      }
      const resp: getAdmin = {
        Admin_id: findemail.Admin_id,
        email: findemail.email,
        name: findemail.name,
      };
      return resp;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "findbyEmail" });
      logs.info(err.message ?? "error buscando el admin por email");
      return null;
    }
  }
  //-----------------------
  async findbyId(admin_id: number): Promise<getAdmin | null> {
    try {
      const find = await Adminschema.findOne({ where: { Admin_id: admin_id } });
      if (find === null) {
        throw new Error("admin no encontrado");
      }
      const resp: getAdmin = {
        Admin_id: find.Admin_id,
        email: find.email,
        name: find.name,
      };
      return resp;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "findbyId" });
      logs.info(err.message ?? "error buscando el admin por ID");
      return null;
    }
  }
  //------------------------
  async update(admin_id: number, admin: createAdmin): Promise<getAdmin | null> {
    try {
      const respArr = await Adminschema.update(admin, {
        where: { Admin_id: admin_id },
        returning: true,
      });
      const { name, Admin_id, email } = respArr[1][0];
      const resp: getAdmin = {
        Admin_id,
        email,
        name,
      };
      return resp;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "update admin" });
      logs.info(err.message ?? "error al actualizar el admin");
      return null;
    }
  }
  //-------------------------
  async login(name: string, email: string): Promise<Admin | null> {
    try {
      const find = await Adminschema.findOne({
        where: { name: name, email: email },
      });
      if (find === null) {
        throw new Error("admin no encontrado");
      }
      const resp: Admin = {
        Admin_id: find.Admin_id,
        email: find.email,
        name: find.name,
        password: find.password,
      };
      return resp;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "login" });
      logs.info(err.message ?? "error al logear el admin");
      return null;
    }
  }
}
