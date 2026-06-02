export enum Status {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  UNPAID = "UNPAID",
}
export enum SoftdeletePayment {
       NO_DELETED = "NO_DELETED",
       DELETED = "DELETED",
}

export interface Payment {
  amount: number;
  date: Date;
  id_payment: number;
  user_id: number;
  user_email: string;
  user_name: string;
  status: Status;
  productsId: number[];
  shipping: boolean;
  softdelete: SoftdeletePayment;
}
/**
* modelo de la base de datos
*/
export type PaymentModel = Omit<Payment, "user_name" | "user_email" | "productsId">;
/**
 *objeot para crear la entidad directamente en BD
 */
export type PaymentDB = Omit<Payment, "id_payment"  | "user_name" | "user_email" | "productsId">;
/**
* productos de la base de datos relacionados con el pago
*/
export interface product_payment {
  productid: number;
  name: string;
  description: string;
  quantity: number;
  imagesurl: string[];
  categoryproduct: string;
}
/**
*  objeto con el id del producto, nombe del producto y el total de ventas
*/
export interface product_sell {
  id: number;
  name: string;
  total_ventas:number;
}
/**
 * payent
 */
export type paymentCreate = Omit<Payment, "id_payment" | "status" | "shipping" | "softdelete">;
//--------------
export class ErrorPayment {
  constructor(private message: string) {}
  get messageError() {
    return this.message;
  }
}
