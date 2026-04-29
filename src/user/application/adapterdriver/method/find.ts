import { ErrorUser, getUser, Payments } from "src/user/domain/user";
import type { FindUser } from "src/user/domain/port/userdriver";
import type { dataqueryUser } from "src/user/domain/port/driven_user";
import { emailfilter, numberfilter } from "src/user/application/filter";

export class FindUserAdapter implements FindUser {
  constructor(private readonly userDriver: dataqueryUser) {}
  //----------------------------------
  async findPaymentUser(userId: number): Promise<Payments | ErrorUser> {
    try {
      const { success } = numberfilter.safeParse({ number: userId });
      if (!success) {
        throw new Error("user id invalido");
      }
      const resp = await this.userDriver.findPaymentUser(userId);
      if (resp === null) {
        throw new Error("error al buscar pagos del usuario");
      }
      return resp;
    } catch (e) {
      const err = e as Error;
      return new ErrorUser(err.message ?? "error al buscar pagos del usuario");
    }
  }
  //----------------------------------
  async findUserByEmail(email: string): Promise<getUser | ErrorUser> {
    try {
      const { success } = emailfilter.safeParse({ email });
      if (!success) {
        throw new Error("email invalido");
      }
      //----------------------
      const resp = await this.userDriver.findUserByEmail(email);
      if (resp === null) {
        throw new Error("error al buscar el usuario");
      }
      return resp;
    } catch (e) {
      const err = e as Error;
      return new ErrorUser(err.message ?? "error al buscar el usuario");
    }
  }
  //---------------------------
  async findUserById(userId: number): Promise<getUser | ErrorUser> {
    try {
      const { success } = numberfilter.safeParse({ number: userId });
      if (!success) {
        throw new Error("user id invalido");
      }
      //-----------------------
      const resp = await this.userDriver.findUserById(userId);
      if (resp === null) {
        throw new Error("usuario no encontrado");
      }
      return resp;
    } catch (e) {
      const err = e as Error;
      return new ErrorUser(err.message ?? "error al buscar el usuario");
    }
  }
}
