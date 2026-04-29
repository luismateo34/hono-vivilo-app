import { Admin } from "src/admin/domain/admin";
import { seqlize } from "src/database";
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType
} from "sequelize-typescript";

@Table({ tableName:"Admins" })
export class Adminschema extends Model implements Admin {
  @PrimaryKey
  @Column({
    allowNull: false,
    autoIncrement: true,
    type:DataType.NUMBER
  })
  Admin_id!: number;
  @Column({
    type:DataType.STRING
  })
  email!: string;
  @Column({
    type:DataType.STRING
  })
  name!: string;
  @Column({
    type:DataType.STRING
  })
  password!: string;
}
seqlize.addModels([Adminschema])
