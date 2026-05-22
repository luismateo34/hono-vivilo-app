export enum Status {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  UNPAID = "UNPAID",
}

export interface Payment {
  amount: number;
  date: Date;
  id_payment: string;
  user_id: number;
  user_email: string;
  user_name: string;
  status: Status;
  productsId: number[];
  shipping: boolean;
}
export type PaymentModel = Omit<Payment, "user_name" | "user_email" | "productsId">;
export interface product_payment {
  productid: number;
  name: string;
  description: string;
  quantity: number;
  imagesurl: string[];
  categoryproduct: string;
}
export interface product_sell {
  id: number;
  name: string;
  total_ventas:number;
}
//-------------
export type paymentCreate = Omit<Payment, "id_payment" | "status" | "shipping">;
//-------------
export type PaymentDB = Omit<Payment, "id_payment"  | "user_name" | "user_email" | "productsId">;
//--------------
export class ErrorPayment {
  constructor(private message: string) {}
  get messageError() {
    return this.message;
  }
}
