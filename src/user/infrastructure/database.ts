import type { dataqueryUser } from "src/user/domain/port/driven_user";
import { UserSchema } from "src/user/infrastructure/userSchema";
import pino from "pino";
import { createUser } from "./userservice";
import {
  getUser,
  paymentObj,
  Payments,
  User,
} from "src/user/domain/user";
import { PaymentSchema } from "src/payment/infrastructure/paymentSchema";

export class UserDatabase implements dataqueryUser {
  async verify(email: string): Promise<boolean> {
    try {
      await UserSchema.update({ verify: true }, { where: { email: email } });
      return true;
    } catch (e) {
      const err = e as Error;
      pino()
        .child({ location: "verify-user" })
        .info(err.message ?? "error al verificar el email");
      return false;
    }
  }
  //---------------------------------
  async deleteUser(userId: number): Promise<boolean> {
    try {
      await UserSchema.destroy({ where: { userId: userId } });
      return true;
    } catch (e) {
      const err = e as Error;
      pino()
        .child({ location: "delete-user" })
        .info(err.message ?? "error al borrar el user");
      return false;
    }
  }
  //-----------------------------------
  async createUser(user: createUser): Promise<boolean> {
    try {
      await UserSchema.create(user);
      return true;
    } catch (e) {
      const err = e as Error;
      pino()
        .child({ location: "create-user" })
        .info(err.message ?? "error al crear el user");
      return false;
    }
  }
  //---------------------------------
  async findPaymentUser(userId: number): Promise<Payments | null> {
    try {
      const resp = await UserSchema.findOne({
        include: {
          model: PaymentSchema,
          required: true,
        },
        where: { userId: userId },
      });
      if (resp === null) {
        return null;
      }
      //---------------
      const payments = resp.payments.map((el) => {
        const { amount, date, id, productsId } = el;
        const obj: paymentObj = {
          amount,
          date,
          id,
          productsId,
        };
        return obj;
      });
      //--------------------
      const obj: Payments = {
        payments,
      };
      return obj;
    } catch (e) {
      const err = e as Error;
      pino()
        .child({ location: "findPaymentUser-user" })
        .info(err.message ?? "error al buscar el pago del user");
      return null;
    }
  }
  //---------------------------------
  async findUserByEmail(email: string): Promise<getUser | null> {
    try {
      const resp = await UserSchema.findOne({ where: { email: email } });
      if (resp === null) {
        return null;
      }
      const obj: getUser = {
        email: resp.email,
        name: resp.name,
        userId: resp.userId,
        verify: resp.verify,
      };
      return obj;
    } catch (e) {
      const err = e as Error;
      pino()
        .child({ location: "findUser-byId" })
        .info(err.message ?? "error al buscar el pago del user");
      return null;
    }
  }
  //---------------------------------
  async findUserById(userId: number): Promise<getUser | null> {
    try {
      const resp = await UserSchema.findOne({ where: { userId: userId } });
      if (resp === null) {
        return null;
      }
      const obj: getUser = {
        email: resp.email,
        name: resp.name,
        userId: resp.userId,
        verify: resp.verify,
      };
      return obj;
    } catch (e) {
      const err = e as Error;
      pino()
        .child({ location: "findUser-byId" })
        .info(err.message ?? "error al buscar el pago del user");
      return null;
    }
  }
  //---------------------------------
  async updatePassword(
    password: string,
    userId: number,
  ): Promise<getUser | null> {
    try {
      const resp = await UserSchema.update(
        { password: password },
        { where: { userId: userId }, returning: true },
      );
      if ( resp [1].length === 0){
	throw new Error("error al cambiar la contraseña, datos no encontrados");
      }
      const schema = resp[1][0];
      const obj: getUser = {
        email: schema.email,
        name: schema.name,
        userId: schema.userId,
        verify: schema.verify,
      };
      return obj;
    } catch (e) {
      const err = e as Error;
      pino()
        .child({ location: "user-updatePassword" })
        .info(err.message ?? "error al cambiar la contraseña");
      return null;
    }
  }
  //---------------------------------
 async  updateUser(user: createUser, userId: number): Promise<getUser | null> {
try {
      const resp = await UserSchema.update(
        user,
        { where: { userId: userId }, returning: true },
      );
      if ( resp [1].length === 0){
	throw new Error("error al cambiar la contraseña, datos no encontrados");
      }
      const schema = resp[1][0];
      const obj: getUser = {
        email: schema.email,
        name: schema.name,
        userId: schema.userId,
        verify: schema.verify,
      };
      return obj;
    } catch (e) {
      const err = e as Error;
      pino()
        .child({ location: "updateUser" })
        .info(err.message ?? "error al actualizar el user");
      return null;
    }
  }
  //---------------------------------
  async updateEmail(email: string, userId: number): Promise<getUser | null> {
    try {
      const resp = await UserSchema.update(
        { email: email },
        { where: { userId: userId }, returning: true },
      );
      if ( resp [1].length === 0){
	throw new Error("error al cambiar la contraseña, datos no encontrados");
      }
      const schema = resp[1][0];
      const obj: getUser = {
        email: schema.email,
        name: schema.name,
        userId: schema.userId,
        verify: schema.verify,
      };
      return obj;
    } catch (e) {
      const err = e as Error;
      pino()
        .child({ location: "user-updateEmail" })
        .info(err.message ?? "error al cambiar la email");
      return null;
    }
  }
  //---------------------------------
  async loggin(email: string): Promise<User | null> {
    try {
      const resp = await UserSchema.findOne(
        { where: { email: email } },
      );
      if ( resp === null){
	throw new Error("error al buscar el user por email, respuesta vacia");
      }
      const obj: User = {
          email: resp.email,
	  name: resp.name,
	  password: resp.password,
	  userId: resp.userId,
	  verify: resp.verify
      };
      return obj;
    } catch (e) {
      const err = e as Error;
      pino()
        .child({ location: "logginUser" })
        .info(err.message ?? "error al loggear");
      return null;
    }
  }
}
