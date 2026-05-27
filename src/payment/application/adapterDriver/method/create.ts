import {
  Payment,
  ErrorPayment,
  paymentCreate,
} from "src/payment/domain/payment";
import { createPayment } from "src/payment/domain/port/diver";
import { dataqueryPayment } from "src/payment/domain/port/driven_payment";
import {
  CreatePaymentFilter,
  numberparce,
} from "src/payment/application/filter";
import { ZodError } from "zod";

export class CreatePaymentAdapter implements createPayment {
  constructor(private readonly dataqueryPayment: dataqueryPayment) {}
  /**
  * crea un nuevo pago
  * */
  async create(paymentObj: paymentCreate): Promise<Payment | ErrorPayment> {
    try {
      CreatePaymentFilter.parse(paymentObj);
      const result = await this.dataqueryPayment.create(paymentObj);
      if (!result) {
        throw new Error("error al crear el pago");
      }
      return result;
    } catch (e) {
      if (e instanceof ZodError) {
        return new ErrorPayment("parametros invalido");
      }
      const err = e as Error;
      return new ErrorPayment(err.message ?? "error al crear el pago");
    }
  }
  //----------------
  /**
   * setea el estado de un pago a pendiente pendiente
   * se usa luego de que se creo el pago
   * en el servico de pagos ( ej: mercadopago)
   * */
  async setPending(id_payment: number): Promise<Payment | ErrorPayment> {
    try {
      numberparce.parse({ number: id_payment });
      const result = await this.dataqueryPayment.setPending(id_payment);
      if (!result) {
        throw new Error("error al crear el pago");
      }
      return result;
    } catch (e) {
      if (e instanceof ZodError) {
        return new ErrorPayment("parametros invalido");
      }
      const err = e as Error;
      return new ErrorPayment(
        err.message ?? "error al cambiar el estado del pago",
      );
    }
  }
}
