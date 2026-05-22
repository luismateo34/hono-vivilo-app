import type {
  Payment,
  Status,
  paymentCreate,
  product_payment,
  ErrorPayment,
  product_sell,
} from "src/payment/domain/payment";
//------------------------------
export interface createPayment {
  create(paymentObj: paymentCreate): Promise<Payment | ErrorPayment>;
  setPending(id_payment: number): Promise<Payment | ErrorPayment>;
}
//---------------------------
export interface UpdatePayment {
  updateAll(paymentObj: Payment): Promise<Payment | ErrorPayment>;
  updateShipping(shipping: boolean, id:number): Promise<Payment | ErrorPayment>;
}
export interface ApprovePayment {
  approve(id_payment: number): Promise<Payment | ErrorPayment>;
}
//------------------------------
export interface findPayment {
  findbyId(id_payment: number): Promise<Payment | ErrorPayment>;
  //------------------
  findby_User_id(id_user: number): Promise<Payment[] | ErrorPayment>;
  //------------------
  findbyStatus(status: Status): Promise<Payment[] | ErrorPayment>;
  //------------------
  //------------------
  findby_Range_Date(
    initialDate: Date,
    finishdate: Date,
  ): Promise<Payment[] | ErrorPayment>;
  //------------------
  findbyShipping(shipping: boolean): Promise<Payment[] | ErrorPayment>;
  //------------------
  findAll_by_UserName(
    name: string,
    email: string,
  ): Promise<Payment[] | ErrorPayment>;
  //------------------
  findby_RangeDate_and_UserName(
    name: string,
    email: string,
    initdate: Date,
    finishdate: Date,
  ): Promise<Payment[] | ErrorPayment>;
  //------------------
  findProducts_byId(
    id_payment: number,
  ): Promise<product_payment[] | ErrorPayment>;
}
//------------------------------
export interface Sells_list{
Product_sells_list(init_time:Date, final_time:Date):Promise<product_sell[] | ErrorPayment>
}
//------------------------------
export interface deletePayment {
  delete(id_payment: number): Promise<true | ErrorPayment>;
}
//------------------------------
export interface facedePayment
  extends
    Sells_list,
    createPayment,
    UpdatePayment,
    findPayment,
    deletePayment,
    ApprovePayment,
    deletePayment {}
