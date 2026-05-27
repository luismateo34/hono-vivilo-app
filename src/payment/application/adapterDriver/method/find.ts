import {
  Payment,
  ErrorPayment,
  product_payment,
  Status,
  product_sell,
} from "src/payment/domain/payment";
import { findPayment, Sells_list } from "src/payment/domain/port/driver";
import { dataqueryPayment } from "src/payment/domain/port/driven_payment";
import {
  numberparce,
  statusparce,
  dateparce,
  emailparse,
  nameparce,
  booleanParce,
} from "src/payment/application/filter";
import { ZodError } from "zod";

export class FindpaymentAdapter implements findPayment, Sells_list {
  constructor(private readonly dataqueryPayment: dataqueryPayment) {}
  //----------------------------
  //----------------------------
  async Product_sells_list (init_time: Date, final_time: Date): Promise<product_sell[] | ErrorPayment> {
      try{
      dateparce.parse({ date: init_time });
      dateparce.parse({ date: final_time });
      const resp = await this.dataqueryPayment.sells_list(init_time, final_time)
      if (resp === null ){
         throw new Error()
      }
      return resp
    }catch(e){
      if (e instanceof ZodError) {
        return new ErrorPayment("parametro invalido");
      }
      const err = e as Error;
      return new ErrorPayment(err.message ?? "error al productos pagados");

    }
  }
  //----------------------------
  //----------------------------
  async findby_Range_Date(
    initialDate: Date,
    finishdate: Date,
  ): Promise<Payment[] | ErrorPayment> {
    try {
      dateparce.parse({ date: initialDate });
      dateparce.parse({ date: finishdate });
      const resp = await this.dataqueryPayment.getbyRangeDate(
        initialDate,
        finishdate,
      );
      if (resp === null) {
        throw new Error("error al obtener los pagos");
      }
      return resp;
    } catch (e) {
      if (e instanceof ZodError) {
        return new ErrorPayment("parametro invalido");
      }
      const err = e as Error;
      return new ErrorPayment(err.message ?? "error al obtener los pagos");
    }
  }
  //----------------------------
  //----------------------------
  async findby_RangeDate_and_UserName(name: string, email: string, initdate: Date, finishdate: Date): Promise<Payment[] | ErrorPayment> {
     try{
      nameparce.parse({ name });
      emailparse.parse({ email });
      dateparce.parse({ date:initdate });
      dateparce.parse({ date:finishdate });
      const resp = await this.dataqueryPayment.getby_RangeDate_and_UserName(name, email, initdate, finishdate);
      if (resp === null) {
        throw new Error("error al obtener los pagos");
      }
      return resp;

    } catch(e){
      if (e instanceof ZodError) {
        return new ErrorPayment("parametro invalido");
      }
      const err = e as Error;
      return new ErrorPayment(err.message ?? "error al obtener los pagos");
    }
  }
  //----------------------------
  //----------------------------
  async findbyShipping(shipping: boolean): Promise<Payment[] | ErrorPayment> {
    try {
      booleanParce.parse({ shipping: shipping });
      const resp = await this.dataqueryPayment.getbyShipping(shipping);
      if (resp === null) {
        throw new Error("error al obtener los pagos");
      }
      return resp;
    } catch (e) {
      if (e instanceof ZodError) {
        return new ErrorPayment("parametro invalido");
      }
      const err = e as Error;
      return new ErrorPayment(err.message ?? "error al obtener los pagos");
    }
  }
  //----------------------------
  async findProducts_byId(
    id_payment: number,
  ): Promise<product_payment[] | ErrorPayment> {
    try {
      numberparce.parse({ number: id_payment });
      const resp = await this.dataqueryPayment.findProducts(id_payment);
      if (resp === null) {
        throw new Error(" no existen productos para el pago");
      }
      return resp;
    } catch (e) {
      if (e instanceof ZodError) {
        return new ErrorPayment("parametro invalido");
      }
      const err = e as Error;
      return new ErrorPayment(err.message ?? "error al obtener los pagos");
    }
  }
  //---------------------------
  async findAll_by_UserName(
    name: string,
    email: string,
  ): Promise<Payment[] | ErrorPayment> {
    try {
      nameparce.parse({ name });
      emailparse.parse({ email });
      const resp = await this.dataqueryPayment.getAll_by_UserName(name, email);
      if (resp === null) {
        throw new Error("datos no encontrado");
      }
      return resp;
    } catch (e) {
      if (e instanceof ZodError) {
        return new ErrorPayment("parametro invalido");
      }
      const err = e as Error;
      return new ErrorPayment(err.message ?? "error al obtener los pagos");
    }
  }
  //----------------
    //----------------
  async findby_User_id(id_user: number): Promise<Payment[] | ErrorPayment> {
    try {
      numberparce.parse({ number: id_user });
      const resp = await this.dataqueryPayment.getby_User_id(id_user);
      if (resp === null) {
        throw new Error("error al obtener los pagos");
      }
      return resp;
    } catch (e) {
      if (e instanceof ZodError) {
        return new ErrorPayment("parametro invalido");
      }
      const err = e as Error;
      return new ErrorPayment(err.message ?? "error al obtener los pagos");
    }
  }
    //----------------
  async findbyId(id_payment: number): Promise<Payment | ErrorPayment> {
    try {
      numberparce.parse({ number: id_payment });
      const resp = await this.dataqueryPayment.getbyId(id_payment);
      if (resp === null) {
        throw new Error("error al obtener los pagos");
      }
      return resp;
    } catch (e) {
      if (e instanceof ZodError) {
        return new ErrorPayment("parametro invalido");
      }
      const err = e as Error;
      return new ErrorPayment(err.message ?? "error al obtener los pagos");
    }
  }
  //----------------
  async findbyStatus(status: Status): Promise<Payment[] | ErrorPayment> {
    try {
      statusparce.parse({ status });
      const resp = await this.dataqueryPayment.getbyStatus(status);
      if (resp === null) {
        throw new Error("error al obtener los pagos");
      }
      return resp;
    } catch (e) {
      if (e instanceof ZodError) {
        return new ErrorPayment("parametro invalido");
      }
      const err = e as Error;
      return new ErrorPayment(err.message ?? "error al obtener los pagos");
    }
  }
}
