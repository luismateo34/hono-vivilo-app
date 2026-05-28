import { ErrorPayment } from "src/payment/domain/payment";
import { deletePayment } from "src/payment/domain/port/driver";
import { dataqueryPayment } from "src/payment/domain/port/driven_payment";
import { IdArray } from "src/payment/application/filter";
import { ZodError } from "zod";

export class DeletePaymentDriver implements deletePayment {
  constructor(private readonly dataqueryPayment: dataqueryPayment) {}
  //----------------------
  async delete(id_payments: number[]): Promise<true | ErrorPayment> {
    try {
      const uniqueSet = new Set(id_payments);
      const uniqueArray = Array.from(uniqueSet);
      IdArray.parse({ idPayments: uniqueArray });
      const result = await this.dataqueryPayment.deletePayment(uniqueArray);
      //------------------
      if (!result) {
        throw new Error("error al eliminar el pago");
      }
      return true;
    } catch (e) {
      if (e instanceof ZodError) {
        return new ErrorPayment("parametros invalido");
      }
      const err = e as Error;
      return new ErrorPayment(err.message ?? "error al eliminar el pago");
    }
  }
}
