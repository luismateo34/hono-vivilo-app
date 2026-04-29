import { seqlize } from "src/database";
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  BelongsToMany
} from "sequelize-typescript";
import { Product_to_payments } from "src/product_to_payment";
import { PaymentSchema } from "src/payment/infrastructure/paymentSchema";
import { Product, Category } from "src/product/domain/product";

@Table({ tableName: "Products" })
export class Productschema extends Model implements Product {
  @Column({
    type: DataType.ENUM(...Object.values(Category)),
    allowNull: false,
  })
  categoryproduct!: Category;
  //--------------------
  @Column({
    type: DataType.STRING,
  })
  description!: string;
  //------------------
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  imagesUrl!: string[];
  //------------------
  @Column({ type: DataType.STRING })
  name!: string;
  //------------------
  @Column({ type: DataType.BOOLEAN })
  offert!: boolean;
  //------------------
  @Column({
    type: DataType.FLOAT,
  })
  offertPercent!: number;
  //------------------
  @Column({
    type: DataType.FLOAT,
  })
  price!: number;
  //------------------
  @PrimaryKey
  @Column({
    allowNull:false,
    autoIncrement:true,
    type: DataType.INTEGER,
  })
  productId!: number;
  //------------------
  @Column({
    type: DataType.INTEGER,
  })
  quantity!: number;
  //------------------
  @BelongsToMany(()=> PaymentSchema,()=> Product_to_payments)
  Payment!:PaymentSchema
}
seqlize.addModels([Productschema]);
