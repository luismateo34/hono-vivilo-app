import { dataqueryPayment } from "src/payment/domain/port/driven_payment";
import { PaymentSchema } from "src/payment/infrastructure/paymentSchema";
import { UserSchema } from "src/user/infrastructure/userSchema";
import {
  Payment,
  product_payment,
  Status,
  product_sell,
} from "src/payment/domain/payment";
import { Op } from "sequelize";
import pino from "pino";
import { Productschema } from "src/product/infrastructure/schema";
import { GroupBy } from "./groupBy";

type findSql = Pick<
  dataqueryPayment,
  | "getby_RangeDate_and_UserName"
  | "getbyId"
  | "getbyRangeDate"
  | "getbyStatus"
  | "getby_User_id"
  | "findProducts"
  | "getbyShipping"
  | "getAll_by_UserName"
  | "sells_list"
>;

export class FindPayment implements findSql {
  //------------------
  async sells_list(
    initdate: Date,
    finalDate: Date,
  ): Promise<product_sell[] | null> {
    const resp = await GroupBy(initdate, finalDate);
    return resp;
  }
  //------------------
  async getby_User_id(id_user: number): Promise<Payment[] | null> {
    try {
      const resp = await PaymentSchema.findAll({
        where: { user_id: id_user },
        include: [
          { model: UserSchema, required: true },
          { model: Productschema, required: true },
        ],
      });
      if (resp.length === 0) {
        return null;
      }
      const ArrPayment = resp.map((el) => {
        const {
          status,
          amount,
          date,
          id_payment,
          shipping,
          user_id,
          user,
          products,
        } = el;
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
      });
      return ArrPayment;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "Payment by finduserId" });
      logs.info(err.message ?? "error al obtener payment");
      return null;
    }
  }
  //------------------
  async getby_RangeDate_and_UserName(
    name: string,
    email: string,
    initdate: Date,
    finishdate: Date,
  ): Promise<Payment[] | null> {
    try {
      const resp = await PaymentSchema.findAll({
        include: [
          {
            model: UserSchema,
            required: true,
            attributes: ["name", "email"],
            where: { name: name, email: email },
          },
          { model: Productschema, required: true },
        ],
        where: { date: { [Op.between]: [initdate, finishdate] } },
      });
      if (resp.length === 0) {
        return null;
      }
      const obj = resp.map((el) => {
        const {
          amount,
          date,
          id_payment,
          user_id,
          shipping,
          status,
          user,
          products,
        } = el;
        const paymentObj: Payment = {
          amount,
          date,
          id_payment,
          productsId: products.map((el) => el.productId),
          shipping,
          status,
          user_id,
          user_email: user.email,
          user_name: user.email,
        };
        return paymentObj;
      });
      return obj;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({
        location: "Payment by getby_RangeDate_and_UserName",
      });
      logs.info(err.message ?? "error al obtener payment");
      return null;
    }
  }
  //------------------
  async getbyRangeDate(
    initdate: Date,
    finishdate: Date,
  ): Promise<Payment[] | null> {
    try {
      const resp = await PaymentSchema.findAll({
        where: { date: { [Op.between]: [initdate, finishdate] } },
        include: { model: Productschema, required: true },
      });
      if (resp.length === 0) {
        return null;
      }
      const obj = resp.map((el) => {
        const {
          amount,
          date,
          id_payment,
          user_id,
          shipping,
          status,
          user,
          products,
        } = el;
        const paymentObj: Payment = {
          amount,
          date,
          id_payment,
          productsId: products.map((el) => el.productId),
          shipping,
          status,
          user_id,
          user_email: user.email,
          user_name: user.email,
        };
        return paymentObj;
      });
      return obj;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "Payment by getby_RangeDate" });
      logs.info(err.message ?? "error al obtener payment");
      return null;
    }
  }
  //------------------
  async getbyId(id_payment: number): Promise<Payment | null> {
    try {
      const resp = await PaymentSchema.findOne({
        where: { id_payment: id_payment },
        include: { model: Productschema, required: true },
      });
      if (resp === null) {
        return null;
      }
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
      const logs = pino().child({ location: "Payment by getbyId" });
      logs.info(err.message ?? "error al obtener payment");
      return null;
    }
  }
  //------------------
  async getAll_by_UserName(
    name: string,
    email: string,
  ): Promise<Payment[] | null> {
    try {
      const resp = await PaymentSchema.findAll({
        include: [
          {
            where: { name: name, email: email },
          },
          { model: Productschema, required: true },
        ],
      });
      if (resp.length === 0) {
        return null;
      }
      const obj = resp.map((el) => {
        const {
          amount,
          date,
          id_payment,
          user_id,
          shipping,
          status,
          user,
          products,
        } = el;
        const paymentObj: Payment = {
          amount,
          date,
          id_payment,
          productsId: products.map((el) => el.productId),
          shipping,
          status,
          user_id,
          user_email: user.email,
          user_name: user.email,
        };
        return paymentObj;
      });
      return obj;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({
        location: "Payment by getAll_by_UserName",
      });
      logs.info(err.message ?? "error al obtener payment");
      return null;
    }
  }
  //------------------
  async getbyShipping(shipping: boolean): Promise<Payment[] | null> {
    try {
      const resp = await PaymentSchema.findAll({
        where: { shipping: shipping },
        include: [
          {
            model: UserSchema,
            required: true,
            attributes: ["name", "email"],
          },
          { model: Productschema, required: true },
        ],
      });
      if (resp.length === 0) {
        return null;
      }
      const obj = resp.map((el) => {
        const {
          amount,
          date,
          id_payment,
          user_id,
          shipping,
          status,
          user,
          products,
        } = el;
        const paymentObj: Payment = {
          amount,
          date,
          id_payment,
          productsId: products.map((el) => el.productId),
          shipping,
          status,
          user_id,
          user_email: user.email,
          user_name: user.email,
        };
        return paymentObj;
      });
      return obj;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({
        location: "Payment by getbyShipping",
      });
      logs.info(err.message ?? "error al obtener payment");
      return null;
    }
  }
  //------------------
  async findProducts(id_payments: number[]): Promise<product_payment[] | null> {
    try {
      const resp = await PaymentSchema.findAll({
        where: {
          id_payment: {
            [Op.in]: id_payments,
          },
        },
        include: {
          model: Productschema,
          required: true,
        },
      });
      if (resp === null) {
        return null;
      }
      const objResp = resp
        .map((el) => el.products)
        .flat()
        .map((el) => {
          const products_pay: product_payment = {
            categoryproduct: el.categoryproduct,
            description: el.description,
            quantity: el.quantity,
            imagesurl: el.imagesUrl,
            productid: el.productId,
            name: el.name,
          };
          return products_pay;
        });
      return objResp;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({
        location: "findPayment by findProducts",
      });
      logs.info(err.message ?? "error al obtener payment");
      return null;
    }
  }
  //------------------
  async getbyStatus(
    status: Status,
    initdate: Date,
    finishdate: Date,
  ): Promise<Payment[] | null> {
    try {
      const resp = await PaymentSchema.findAll({
        where: {
          status: status,
          date: { [Op.between]: [initdate, finishdate] },
        },
        include: { model: Productschema, required: true },
      });
      if (resp.length === 0) {
        return null;
      }
      const obj = resp.map((el) => {
        const paymentObj: Payment = {
          amount: el.amount,
          date: el.date,
          id_payment: el.id_payment,
          productsId: el.products.map((el) => el.productId),
          shipping: el.shipping,
          status: el.status,
          user_email: el.user.email,
          user_id: el.user_id,
          user_name: el.user.name,
        };
        return paymentObj;
      });
      return obj;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({
        location: "payment by findbysatatus",
      });
      logs.info(err.message ?? "error al obtener payment");
      return null;
    }
  }
}
