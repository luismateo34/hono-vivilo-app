import { Payment, ErrorPayment, paymentCreate } from "src/payment/domain/payment";
import {createPayment } from "src/payment/domain/port/diver";
import { dataqueryPayment } from "src/payment/domain/port/driven_payment";
import { paymentFilter } from "src/payment/application/filter";
import { ZodError } from "zod";

export class CreatePaymentAdapter implements createPayment{
  constructor(private readonly dataqueryPayment: dataqueryPayment){}
  async create(paymentObj: paymentCreate): Promise<Payment | ErrorPayment> {
      try{
      paymentFilter.parse(paymentObj);

      const result = await this.dataqueryPayment.create(paymentObj)
      if ( !result){
	throw new Error("error al crear el pago")
      }
      return result
    } catch(e){
      if ( e instanceof ZodError) {
      return new ErrorPayment("parametros invalido");
      }
      const err = e as Error
      return new ErrorPayment(err.message ?? "error al crear el pago")
    }
  }
}
