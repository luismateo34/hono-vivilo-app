import {
  ErrorPayment,
} from "src/payment/domain/payment";
import { deletePayment } from "src/payment/domain/port/diver";
import { dataqueryPayment } from "src/payment/domain/port/driven_payment";
import { numberparce } from "src/payment/application/filter";
import { ZodError } from "zod";

export class DeletePaymentDriver implements deletePayment {
  constructor(private readonly dataqueryPayment: dataqueryPayment) {}
  //----------------------
  async delete(id_payment: number): Promise<true | ErrorPayment> {
    try {
      numberparce.parse({ number: id_payment });
      const result = await this.dataqueryPayment.deletePayment(id_payment);
      if (!result) {
        throw new Error("error al eliminar el pago");
      }
      return true;
    } catch (e) {
      if ( e instanceof ZodError) {
      return new ErrorPayment("parametros invalido");
      }
      const err = e as Error;
      return new ErrorPayment(err.message ?? "error al eliminar el pago");
    }
  }
}
