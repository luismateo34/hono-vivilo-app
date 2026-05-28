import { Admin, createAdmin, getAdmin } from "src/admin/domain/admin";
import { databaseAdminQuery } from "src/admin/domain/port/Driven_port";

export const password = "catPassword";
export const emailTest = "testcat@gmail.com";
export const emailExistTest = "testgatogordo@gmail.com";
export const nameTest = "catTest";

export class adminQueryMock implements databaseAdminQuery {
  async deleteAdminByID(admin_id: number): Promise<boolean> {
    const objPromise = admin_id === 1 ? true : false;
    return objPromise;
  }
  //----------
  async createAdmin(admin: createAdmin): Promise<getAdmin | null> {
    try {
      const objPromise: getAdmin = {
        Admin_id: 1,
        email: admin.email,
        name: admin.name,
      };
      if ( admin.password === "gatonotangordo"){
	throw new Error("password is required");
      }
      return objPromise;
    } catch {
      return null;
    }
  }

  //-------------
  async findbyEmail(email: string): Promise<getAdmin | null> {
    try {
      const objPromise: getAdmin = {
        Admin_id: 1,
        email: emailExistTest,
        name: nameTest,
      };
      if (email !== emailExistTest && email !== emailTest) {
        throw new Error("admin not found");
      }
      return objPromise;
    } catch {
      return null;
    }
  }
  //---------
  async findbyId(admin_id: number): Promise<getAdmin | null> {
    const objPromise: getAdmin = {
      Admin_id: 1,
      email: emailTest,
      name: nameTest,
    };
    if (admin_id !== 1) {
      return null;
    }
    return objPromise;
  }
  //----------
  async update(admin_id: number, admin: createAdmin): Promise<getAdmin | null> {
    const objPromise: getAdmin = {
      Admin_id: 1,
      email: admin.email,
      name: admin.name,
    };
    if (admin_id !== 1) {
      return null;
    }
    return objPromise;
  }
  //--------------
  async login(name: string, email: string): Promise<Admin | null> {
    const objPromise: Admin = {
      Admin_id: 1,
      email: email,
      name: name,
      password: password,
    };
    if (email !== emailTest) {
      return null;
    }
    return objPromise;
  }
}
