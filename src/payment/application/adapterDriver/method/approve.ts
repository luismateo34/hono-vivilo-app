import {
  Payment,
  ErrorPayment,
  Status,
} from "src/payment/domain/payment";
import { ApprovePayment } from "src/payment/domain/port/diver";
import { dataqueryPayment } from "src/payment/domain/port/driven_payment";
import { numberparce } from "src/payment/application/filter";
import { ZodError } from "zod";

export class ApprovePaymentAdapter implements ApprovePayment {
  constructor(private readonly dataqueryPayment: dataqueryPayment) {}
  /**
  *  aprobar un pago como rcibido por
  *   la empresa que gestiona los pagos
  *   ej: mercadopago
  * */
  async approve(id_payment: number): Promise<Payment | ErrorPayment> {
    try {
      numberparce.parse({ number: id_payment });
      const result = await this.dataqueryPayment.updateStatus(
        Status.APPROVED,
        id_payment,
      );
      if (!result && typeof result === "boolean") {
        throw new Error("error al aprobar el pago");
      }
      return result;
    } catch (e) {
      if ( e instanceof ZodError) {
      return new ErrorPayment("parametro invalido");
      }
      const err = e as Error;
      return new ErrorPayment(err.message ?? "error al aprobar el pago");
    }
  }
}
