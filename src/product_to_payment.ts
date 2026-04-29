import { seqlize } from "src/database";
import {
  Table,
  Column,
  Model,
  ForeignKey
} from "sequelize-typescript";
import { Productschema } from "src/product/infrastructure/schema";
import { PaymentSchema } from "src/payment/infrastructure/paymentSchema";

@Table({ tableName: "Product_to_payments" })
export class Product_to_payments extends Model {
  @ForeignKey(()=>Productschema)
  @Column
  productId!: number
  //---------------
  @ForeignKey(()=> PaymentSchema)
  @Column
  PaymentId!: number
}

seqlize.addModels([Product_to_payments]);
