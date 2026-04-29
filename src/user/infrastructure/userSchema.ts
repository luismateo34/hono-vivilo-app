import { seqlize } from "src/database";
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  HasMany
} from "sequelize-typescript";
import { User } from "src/user/domain/user";
import { PaymentSchema } from "src/payment/infrastructure/paymentSchema";

@Table({ tableName: "Users", freezeTableName: true })
export class UserSchema extends Model implements User {
  @Column({
    type: DataType.STRING,
  })
  email!: string;
  //------------------
  @Column({
    type: DataType.STRING,
  })
  name!: string;
  //------------------
  @Column({
    type: DataType.STRING,
  })
  password!: string;
  //------------------
  @PrimaryKey
  @Column({
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  userId!: number;
  //------------------
  @Column({
    type: DataType.BOOLEAN,
  })
  verify!: boolean;
  //------------------
  @HasMany(()=>PaymentSchema)
  payments!: PaymentSchema[]
}

seqlize.addModels([UserSchema]);
