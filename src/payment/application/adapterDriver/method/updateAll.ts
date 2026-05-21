import { ErrorPayment, Payment } from "src/payment/domain/payment";
import { UpdatePayment } from "src/payment/domain/port/diver";
import { dataqueryPayment } from "src/payment/domain/port/driven_payment";
import { paymentFilter,  updateShippingFilter } from "src/payment/application/filter";
import { ZodError } from "zod";

export class UpdateAllAdapter implements UpdatePayment {
  constructor(private readonly paymentRepository: dataqueryPayment) {}
  //------------------------------
  async updateShipping(
    shipping: boolean,
    id: number,
  ): Promise<Payment | ErrorPayment> {
    try {
      updateShippingFilter.parse({ shipping: shipping, id: id })
      const result = await this.paymentRepository.updateShipping(shipping, id);
      if (typeof result === "boolean" && !result) {
        throw new Error("error al actualizar el pago");
      }
      return result;
    } catch (e) {
      if (e instanceof ZodError) {
        return new ErrorPayment("datos invalidos");
      }
      const err = e as Error;
      return new ErrorPayment(err.message ?? "error al actualizar el envio");
    }
  }

  //-----------------------------
  async updateAll(paymentObj: Payment): Promise<Payment | ErrorPayment> {
    try {
      paymentFilter.parse(paymentObj);
      const result = await this.paymentRepository.updateAll(paymentObj);
      if (typeof result === "boolean" && !result) {
        throw new Error("error al actualizar el pago");
      }
      return result;
    } catch (e) {
      if (e instanceof ZodError) {
        return new ErrorPayment("datos invalidos");
      }
      const err = e as Error;
      return new ErrorPayment(err.message ?? "error al actualizar el pago");
    }
  }
}
