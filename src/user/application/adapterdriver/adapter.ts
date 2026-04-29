import type { FacadesUser } from "src/user/domain/port/userdriver";
import type { dataqueryUser } from "src/user/domain/port/driven_user";
import { createUserAdapter } from "./method/create";
import { FindUserAdapter } from "./method/find";
import { DeleteUserAdapter } from "./method/delete";
import { updateUserAdapter } from "./method/update";
import { createUser, getUser, ErrorUser, Payments } from "../../domain/user";
import { comparePassword } from "src/utils/criptUtils";

//-------------------------
export class UserAdapter implements FacadesUser {
  constructor(private userDriven: dataqueryUser) {}
   async findPaymentUser(userId: number): Promise<Payments | ErrorUser> {
   return new FindUserAdapter(this.userDriven).findPaymentUser(userId)
   }
  //-----------------------------
  async deleteUser(userId: number): Promise<boolean> {
    return new DeleteUserAdapter(this.userDriven).deleteUser(userId);
  }
  //-------------------------
  async createUser(user: createUser): Promise<getUser | ErrorUser> {
    return new createUserAdapter(this.userDriven).createUser(user);
  }
  //-------------------------------
  async findUserByEmail(email: string): Promise<getUser | ErrorUser> {
    return new FindUserAdapter(this.userDriven).findUserByEmail(email);
  }
  //--------------------------------
  async findUserById(userId: number): Promise<getUser | ErrorUser> {
    return new FindUserAdapter(this.userDriven).findUserById(userId);
  }
    //---------------------------
  async updateEmail(
    email: string,
    userId: number,
  ): Promise<getUser | ErrorUser> {
    return new updateUserAdapter(this.userDriven).updateEmail(email, userId);
  }
  //-------------------------
  async verify(email: string): Promise<boolean> {
    return new updateUserAdapter(this.userDriven).verify(email)
  }
  //-------------------------
  async updatePassword(
    password: string,
    userId: number,
  ): Promise<getUser | ErrorUser> {
    return new updateUserAdapter(this.userDriven).updatePassword(
      password,
      userId,
    );
  }
  //---------------------
  async updateUser(
    user: createUser,
    userId: number,
  ): Promise<getUser | ErrorUser> {
    return new updateUserAdapter(this.userDriven).updateUser(user, userId);
  }
  //-------------------------
  async login(email: string, password: string): Promise<getUser | ErrorUser> {
    try {
      const resp = await this.userDriven.loggin(email);
      //---------------
      if (resp === null) {
        throw new ErrorUser("usuario no encontrado");
      }
      //---------------
      const compare = await comparePassword(password, resp.password);
      if (!compare) {
        throw new ErrorUser("contraseña incorrecta");
      }
      //-----------------
      return resp;
    } catch (e) {
      const err = e as Error;
      return new ErrorUser(err.message ?? "error logear");
    }
  }
 }
