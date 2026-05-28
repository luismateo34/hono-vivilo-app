import { Op } from "sequelize";
import { dataqueryPayment } from "src/payment/domain/port/driven_payment";
import { PaymentSchema } from "src/payment/infrastructure/paymentSchema";
import { seqlize } from "src/database";
import {
  Payment,
  product_payment,
  Status,
  paymentCreate,
  product_sell,
  PaymentDB,
} from "src/payment/domain/payment";
import pino from "pino";
import { FindPayment } from "./findSql";

export class databasePayment implements dataqueryPayment {
  private findSql = new FindPayment();
  //----------------------------
  async findProducts(id_payments: number[]): Promise<product_payment[] | null> {
    return this.findSql.findProducts(id_payments);
  }
  //---------------------------
  async getAll_by_UserName(
    name: string,
    email: string,
  ): Promise<Payment[] | null> {
    return this.getAll_by_UserName(name, email);
  }
  //---------------------------
  async getby_RangeDate_and_UserName(
    name: string,
    email: string,
    initdate: Date,
    finishdate: Date,
  ): Promise<Payment[] | null> {
    return this.findSql.getby_RangeDate_and_UserName(
      name,
      email,
      initdate,
      finishdate,
    );
  }
  //---------------------------
  async getby_User_id(id_user: number): Promise<Payment[] | null> {
    return this.findSql.getby_User_id(id_user);
  }
  //---------------------------
  async getbyId(id_payment: number): Promise<Payment | null> {
    return this.findSql.getbyId(id_payment);
  }
  //---------------------------
  async getbyRangeDate(
    initdate: Date,
    finishdate: Date,
  ): Promise<Payment[] | null> {
    return this.findSql.getbyRangeDate(initdate, finishdate);
  }
  //---------------------------
  async getbyShipping(shipping: boolean): Promise<Payment[] | null> {
    return this.findSql.getbyShipping(shipping);
  }
  //---------------------------
  async getbyStatus(
    status: Status,
    initdate: Date,
    finishdate: Date,
  ): Promise<Payment[] | null> {
    return this.findSql.getbyStatus(status, initdate, finishdate);
  }
  //---------------------------
  async sells_list(
    initdate: Date,
    finalDate: Date,
  ): Promise<product_sell[] | null> {
    return this.findSql.sells_list(initdate, finalDate);
  }
  //----------------------------
  async deletePayment(id_payments: number[]): Promise<boolean> {
    try {
      const resp = await PaymentSchema.destroy({
        where: { id: { [Op.in]: id_payments } },
      });
      if (resp !== id_payments.length) {
        throw new Error("error al eliminar todos los payments");
      }
      return true;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "deletePayment" });
      logs.info(err.message ?? "error al eliminar payments");
      return false;
    }
  }
  //------------------
  async create(paymentObj: paymentCreate): Promise<Payment | false> {
    const transaction = await seqlize.transaction();
    let commited: boolean = false;
    try {
      const paymentsDB: PaymentDB = {
        amount: paymentObj.amount,
        date: paymentObj.date,
        shipping: false,
        status: Status.UNPAID,
        user_id: paymentObj.user_id,
      };

      const respCreate = await PaymentSchema.create(paymentsDB, {
        returning: true,
        transaction,
      });
      await respCreate.$set("products", paymentObj.productsId, { transaction });
      await transaction.commit().then(() => {
        commited = true;
      });

      const resp = await PaymentSchema.findByPk(respCreate.id_payment, {
        include: ["user", "products"],
      });
      //-----------------
      if (resp === null) {
        throw new Error("error al buscar el payment");
      }
      //-----------------
      const {
        status,
        amount,
        date,
        id_payment,
        shipping,
        user_id,
        user,
        products,
      } = resp;
      const obj: Payment = {
        amount,
        date,
        id_payment,
        shipping,
        status,
        user_email: user.email ?? "",
        user_id,
        user_name: user.name ?? "",
        productsId: products.map((el) => el.productId),
      };
      return obj;
    } catch (e) {
      if (!commited) {
        await transaction.rollback();
      }
      const err = e as Error;
      const logs = pino().child({ location: "createPayment" });
      logs.info(err.message ?? "error al crear el payment");
      return false;
    }
  }
  //------------------
  async setPending(id_payment: number): Promise<Payment | false> {
    try {
      const isExist = await this.getbyId(id_payment);
      if (isExist !== null) {
        return false;
      }
      //-------------------------------
      const result = await PaymentSchema.update(
        { status: Status.PENDING },
        { where: { id_payment: id_payment }, returning: true },
      );
      const resp = result[1][0];
      const paymentObj: Payment = {
        amount: resp.amount,
        date: resp.date,
        id_payment: resp.id_payment,
        productsId: resp.products.map((el) => el.productId),
        shipping: resp.shipping,
        status: resp.status,
        user_id: resp.user_id,
        user_email: resp.user.email,
        user_name: resp.user.name,
      };
      return paymentObj;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "setPending" });
      logs.info(
        err.message ??
          "error al actualizar es estatus de no pagado a pendiente",
      );
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
        shipping,
        user_id,
        user,
        products,
      } = resp[1][0];
      const obj: Payment = {
        amount,
        date,
        id_payment,
        productsId: products.map((el) => el.productId),
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
        productsId: resp.products.map((el) => el.productId),
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
        productsId: schema.products.map((el) => el.productId),
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
