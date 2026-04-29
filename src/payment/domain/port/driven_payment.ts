import type {
  Payment,
  Status,
  paymentCreate,
  product_payment,
  product_sell,
} from "src/payment/domain/payment";

interface getdrivenPayment {
  getbyId(id_payment: number): Promise<Payment | null>;
  getbyRangeDate(initdate: Date, finishdate: Date): Promise<Payment[] | null>;
  getbyStatus(status: Status): Promise<Payment[] | null>;
  getby_User_id(id_user: number): Promise<Payment[] | null>;
  getbyShipping(shipping: boolean): Promise<Payment[] | null>;
  getAll_by_UserName(name: string, email: string): Promise<Payment[] | null>;
  getby_RangeDate_and_UserName(
    name: string,
    email: string,
    initdate: Date,
    finishdate: Date,
  ): Promise<Payment[] | null>;
  sells_list(initdate: Date, finalDate:Date): Promise<product_sell[] | null>;
  findProducts(id_payment: number): Promise<product_payment[] | null>;
}
//-------------------
interface driverPayment {
  create(paymentObj: paymentCreate): Promise<Payment | false>;
  deletePayment(id_payment: number): Promise<boolean>;
  updateStatus(status: Status, id_payment: number): Promise<Payment | false>;
  updateAll(paymentObj: Payment): Promise<Payment | false>;
  updateShipping(shipping: boolean, id: number): Promise<Payment | false>;
}
//-----------------------
export interface dataqueryPayment extends getdrivenPayment, driverPayment {}
