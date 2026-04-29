import { dataqueryPayment } from "src/payment/domain/port/driven_payment";
import { PaymentSchema } from "src/payment/infrastructure/paymentSchema";
import { UserSchema } from "src/user/infrastructure/userSchema";
import {
  Payment,
  product_payment,
  Status,
  paymentCreate,
  product_sell,
} from "src/payment/domain/payment";
import pino from "pino";
import { FindPayment } from "./findSql";

export class databasePayment implements dataqueryPayment {
  private findSql= new FindPayment()
  //----------------------------
  async findProducts(id_payment: number): Promise<product_payment[] | null> {
      return this.findSql.findProducts(id_payment)
  }
  //---------------------------
  async getAll_by_UserName(name: string, email: string): Promise<Payment[] | null> {
      return this.getAll_by_UserName(name, email)
  }
  //---------------------------
  async getby_RangeDate_and_UserName(name: string, email: string, initdate: Date, finishdate: Date): Promise<Payment[] | null> {
      return this.findSql.getby_RangeDate_and_UserName(name,email,initdate,finishdate)
  }
  //---------------------------
  async getby_User_id(id_user: number): Promise<Payment[] | null> {
      return this.findSql.getby_User_id(id_user)
  }
  //---------------------------
  async getbyId(id_payment: number): Promise<Payment | null> {
      return this.findSql.getbyId(id_payment)
  }
  //---------------------------
  async getbyRangeDate(initdate: Date, finishdate: Date): Promise<Payment[] | null> {
      return this.findSql.getbyRangeDate(initdate, finishdate)
  }
  //---------------------------
  async getbyShipping(shipping: boolean): Promise<Payment[] | null> {
      return this.findSql.getbyShipping(shipping)
  }
  //---------------------------
  async getbyStatus(status: Status): Promise<Payment[] | null> {
      return this.findSql.getbyStatus(status)
  }
  //---------------------------
  async sells_list(initdate: Date, finalDate: Date): Promise<product_sell[] | null> {
      return this.findSql.sells_list(initdate, finalDate)
  }
  //----------------------------
  async deletePayment(id_payment: number): Promise<boolean> {
    try {
      await PaymentSchema.destroy({ where: { id_payment: id_payment } });
      return true;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "deletePayment" });
      logs.info(err.message ?? "error al eliminar payment");
      return false;
    }
  }
  //------------------
  async create(paymentObj: paymentCreate): Promise<Payment | false> {
    try {
      const resp = await PaymentSchema.create(paymentObj, {
        returning: true,
        include: {
          model: UserSchema,
          required: true,
          attributes: ["email", "name"],
        },
      });
      const {
        status,
        amount,
        date,
        id_payment,
        productsId,
        shipping,
        user_id,
        user,
      } = resp;
      const obj: Payment = {
        amount,
        date,
        id_payment,
        productsId,
        shipping,
        status,
        user_email: user.email,
        user_id,
        user_name: user.name,
      };
      return obj;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "createPayment" });
      logs.info(err.message ?? "error al crear el payment");
      return false;
    }
  }
  //------------------
  async updateAll(paymentObj: Payment): Promise<Payment | false> {
    try {
      const resp = await PaymentSchema.update(paymentObj, {
        where: { id_payment: paymentObj.id_payment },
        returning: true,
      });
      const {
        status,
        amount,
        date,
        id_payment,
        productsId,
        shipping,
        user_id,
        user,
      } = resp[1][0];
      const obj: Payment = {
        amount,
        date,
        id_payment,
        productsId,
        shipping,
        status,
        user_email: user.email,
        user_id,
        user_name: user.name,
      };
      return obj;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "updatePayment" });
      logs.info(err.message ?? "error al actualizar payment");
      return false;
    }
  }
  //------------------
  async updateShipping(
    shipping: boolean,
    id: number,
  ): Promise<Payment | false> {
    try {
      const result = await PaymentSchema.update(
        { shipping: shipping },
        {
          where: { id_payment: id },
          returning: true,
        },
      );
      const resp = result[1][0];
      const paymentObj: Payment = {
        amount: resp.amount,
        date: resp.date,
        id_payment: resp.id_payment,
        productsId: resp.productsId,
        shipping: resp.shipping,
        status: resp.status,
        user_id: resp.user_id,
        user_email: resp.user.email,
        user_name: resp.user.name,
      };
      return paymentObj;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "updatePayment" });
      logs.info(err.message ?? "error al actualizar payment");
      return false;
    }
  }
    //------------------
  async updateStatus(
    status: Status,
    id_payment: number,
  ): Promise<Payment | false> {
    try {
      const resp = await PaymentSchema.update(
        { status: status },
        {
          where: { id_payment: id_payment },
          returning: true,
        },
      );
      const schema = resp[1][0];
      const obj: Payment = {
        amount: schema.amount,
        date: schema.date,
        id_payment: schema.id_payment,
        productsId: schema.productsId,
        shipping: schema.shipping,
        status: schema.status,
        user_email: schema.user.email,
        user_id: schema.user_id,
        user_name: schema.user.name,
      };
      return obj;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({
        location: "updatesatatus_payment",
      });
      logs.info(err.message ?? "error al obtener payment");
      return false;
    }
  }
}
