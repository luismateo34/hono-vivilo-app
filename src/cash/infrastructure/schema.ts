import { Cash, Currency } from "src/cash/domain/cash";
import { seqlize } from "src/database";
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
} from "sequelize-typescript";

@Table({ tableName: "Cash" })
export class schemaCash extends Model implements Cash {
  @PrimaryKey
  @Column({
    allowNull:true,
    autoIncrement:true,
    type:DataType.INTEGER
  })
  id_cash!: number;
  @Column({
    type:DataType.FLOAT
  })
  revenue!: number;
  @Column({
    type:DataType.FLOAT
  })
  expense!: number;
  @Column({
    type:DataType.FLOAT
  })
  balance!: number;
  @Column({
    type:DataType.DATEONLY
  })
  date!: Date;
  @Column({
    type: DataType.ENUM(...Object.values(Currency)),
    allowNull: false,
  })
  currency!: Currency;
}
seqlize.addModels([schemaCash])
