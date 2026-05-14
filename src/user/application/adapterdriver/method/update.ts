import { ErrorUser, createUser, getUser } from "src/user/domain/user";
import type { Update } from "src/user/domain/port/userdriver";
import type { dataqueryUser } from "src/user/domain/port/driven_user";
import {
  emailfilter,
  updatePassword,
  updateUser,
  updateEmail,
} from "src/user/application/filter";
import { hashPassword } from "src/utils/criptUtils";

export class updateUserAdapter implements Update {
  constructor(private readonly database: dataqueryUser) {}
  //------------------------------------
  async verify(email: string): Promise<boolean> {
    try {
      emailfilter.parse({ email });
      const update = this.database.verify(email);
      return update;
    } catch {
      return false;
    }
  }
  //----------------------------------------
  async updateEmail(
    email: string,
    userId: number,
  ): Promise<getUser | ErrorUser> {
    try {
      updateEmail.parse({
        email: email,
        userId: userId,
      });
      const resp = await this.database.updateEmail(email, userId);
      //----------------------
      if (resp === null) {
        throw new Error("error al actualizar el email");
      }
      //---------------------
      return resp;
    } catch (e) {
      const err = e as Error;
      return new ErrorUser(err.message ?? "error al actualizar el email");
    }
  }

  //----------------------------------------
  async updatePassword(
    password: string,
    userId: number,
  ): Promise<getUser | ErrorUser> {
    try {
      updatePassword.parse({ userId: userId, password: password });
      const hashedPass = await hashPassword(password);
      const resp = await this.database.updatePassword(hashedPass, userId);
      //----------------------
      if (resp === null) {
        throw new Error("error al actualizar la contraseña");
      }
      //---------------------
      return resp;
    } catch (e) {
      const err = e as Error;
      return new ErrorUser(err.message ?? "error al actualizar la contraseña");
    }
  }
  //----------------------------------------
  async updateUser(
    user: createUser,
    userId: number,
  ): Promise<getUser | ErrorUser> {
    try {
      const obj: createUser & { userId: number } = { ...user, userId: userId };
      updateUser.parse(obj);
      //-------------------------
      const hashedPass = await hashPassword(user.password);
      const updateObj: createUser = { ...user, password: hashedPass };
      const resp = await this.database.updateUser(updateObj, userId);
      if (resp === null) {
        throw new Error("error al actualizar el usuario");
      }
      return resp;
    } catch (e) {
      const err = e as Error;
      return new ErrorUser(err.message ?? "error al actualizar el usuario");
    }
  }
}
