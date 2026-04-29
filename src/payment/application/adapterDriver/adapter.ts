import { dataqueryPayment } from "src/payment/domain/port/driven_payment";
import { ApprovePaymentAdapter } from "./method/approve";
import { FindpaymentAdapter } from "./method/find";
import { CreatePaymentAdapter } from "./method/create";
import { DeletePaymentDriver } from "./method/delete";
import { UpdateAllAdapter } from "./method/updateAll";
import { facedePayment } from "src/payment/domain/port/diver";
import { Payment, ErrorPayment, Status, paymentCreate, product_payment, product_sell } from "src/payment/domain/payment";

//----------------------------------------
export class FacedePaymentAdapter implements facedePayment {
  //------------------------------------------
  private classApprove: ApprovePaymentAdapter;
  private classFind: FindpaymentAdapter;
  private classCreate: CreatePaymentAdapter;
  private classDelete: DeletePaymentDriver;
  private classUpdate: UpdateAllAdapter;
  //------------------------------------------
  constructor(private readonly dataqueryPayment: dataqueryPayment) {
    this.classApprove = new ApprovePaymentAdapter(this.dataqueryPayment);
    this.classFind = new FindpaymentAdapter(this.dataqueryPayment);
    this.classCreate = new CreatePaymentAdapter(this.dataqueryPayment);
    this.classDelete = new DeletePaymentDriver(this.dataqueryPayment);
    this.classUpdate = new UpdateAllAdapter(this.dataqueryPayment);
  }
  //------------------------------------------
   async Product_sells_list(init_time: Date, final_time: Date): Promise<product_sell[] | ErrorPayment> {
       return this.classFind.Product_sells_list(init_time, final_time)
   }
  //------------------------------------------
  async updateShipping(shipping: boolean, id: number): Promise<Payment | ErrorPayment> {
      return this.classUpdate.updateShipping(shipping, id);
  }
  //------------------------------------------
  async findby_Range_Date(initialDate: Date, finishdate: Date): Promise<Payment[] | ErrorPayment> {
     return this.classFind.findby_Range_Date(initialDate, finishdate)
  }
  //------------------------------------------
  async findby_RangeDate_and_UserName(name: string, email: string, initdate: Date, finishdate: Date): Promise<Payment[] | ErrorPayment> {
     return this.classFind.findby_RangeDate_and_UserName(name, email, initdate, finishdate)
  }
  //------------------------------------------
  async findbyShipping(shipping: boolean): Promise<Payment[] | ErrorPayment> {
     return this.classFind.findbyShipping(shipping)
  }
  //------------------------------------------
  async findProducts_byId(id_payment: number): Promise<product_payment[] | ErrorPayment> {
      return this.classFind.findProducts_byId(id_payment)
  }
  //------------------------------------------
  async approve(id_payment: number): Promise<Payment | ErrorPayment> {
    return this.classApprove.approve(id_payment);
  }
  //----------------------------------------
  async create(paymentObj: paymentCreate): Promise<Payment | ErrorPayment> {
    return this.classCreate.create(paymentObj);
  }
  //----------------------------------------
  async delete(id_payment: number): Promise<true | ErrorPayment> {
    return this.classDelete.delete(id_payment);
  }
  //----------------------------------------
  async findAll_by_UserName(
    name: string,
    email: string,
  ): Promise<Payment[] | ErrorPayment> {
    return this.classFind.findAll_by_UserName(name, email);
  }
  //----------------------------------------
   //----------------------------------------
  async findby_User_id(id_user: number): Promise<Payment[] | ErrorPayment> {
    return this.classFind.findby_User_id(id_user);
  }
  //----------------------------------------
  async findbyId(id_payment: number): Promise<Payment | ErrorPayment> {
    return this.classFind.findbyId(id_payment);
  }
  //----------------------------------------
  async updateAll(paymentObj: Payment): Promise<Payment | ErrorPayment> {
    return this.classUpdate.updateAll(paymentObj);
  }
  //----------------------------------------
  async findbyStatus(status: Status): Promise<Payment[] | ErrorPayment> {
    return this.classFind.findbyStatus(status);
  }
}
