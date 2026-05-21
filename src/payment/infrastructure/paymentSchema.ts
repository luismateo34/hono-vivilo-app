import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import { Status, PaymentModel } from "src/payment/domain/payment";
import { UserSchema } from "src/user/infrastructure/userSchema";
import { Product_to_payments } from "src/product_to_payment";
import { Productschema } from "src/product/infrastructure/schema";
import { seqlize } from "src/database";

@Table({ tableName: "Payments" })
export class PaymentSchema extends Model implements PaymentModel {
  @Column({ type: DataType.INTEGER })
  amount!: number;
  //-----------
  @Column({ type: DataType.DATEONLY })
  date!: Date;
  //-----------
  @PrimaryKey
  @Column({ type: DataType.STRING, allowNull: false, unique:true })
  id_payment!: string;
  //-----------
  //-----------
  @Column({ type: DataType.BOOLEAN })
  shipping!: boolean;
  //-----------
  @Column({ type: DataType.ENUM(...Object.values(Status)), allowNull: false })
  status!: Status;
  //-----------
  @ForeignKey(() => UserSchema)
  @Column({ type: DataType.INTEGER })
  user_id!: number;
  //-----------
  @BelongsTo(() => UserSchema)
  user!: UserSchema;
  //-------------
  @BelongsToMany(() => Productschema, () => Product_to_payments)
  products!: [Productschema];
}
seqlize.addModels([PaymentSchema]);
