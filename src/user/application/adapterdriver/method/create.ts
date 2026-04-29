import { ErrorUser, createUser, getUser } from "src/user/domain/user";
import type { Create } from "src/user/domain/port/userdriver";
import type { dataqueryUser } from "src/user/domain/port/driven_user";
import { createUserfilter } from "src/user/application/filter";
import { hashPassword } from "src/utils/criptUtils";

//-----------------------------------------
export class createUserAdapter implements Create {
  constructor(private readonly userDriver: dataqueryUser) {}
  //-----------------------------------
  private async isUserExists(user: createUser): Promise<boolean> {
    try {
      const isUserExists = await this.userDriver.findUserByEmail(user.email);
      if (isUserExists === null) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }
  //----------------------------------
  async createUser(user: createUser): Promise<getUser | ErrorUser> {
    try {
      const { success } = createUserfilter.safeParse(user);
      if (!success) {
        throw new Error("parametros de entrada invalidos");
      }
      //-------------------------------------
      const exists = await this.isUserExists(user);
      if (exists) {
        throw new Error("usuario ya registrado con el mismo email");
      }
      //-----------------------------
      const hashedPass = await hashPassword(user.password);
      const userObj:createUser = { ...user, password:hashedPass }
      const createUser = await this.userDriver.createUser(userObj);
      if (!createUser) {
        throw new Error("error al crear el usuario");
      }
      //-----------------------------
      const response = await this.userDriver.findUserByEmail(user.email);
      if (response === null) {
        throw new Error("error al buscar el usuario");
      }
      return response;
    } catch (e) {
      const err = e as Error;
      return new ErrorUser(err.message ?? "error al crear el usuario");
    }
  }
}
