import {envObj } from "src/envObj";
import { Sequelize } from "sequelize-typescript";
import pg from "pg";

class SequelizeSingleton {
  static instance: SequelizeSingleton
  private sequelize = new Sequelize(envObj.POSTGRES_URL, {
        dialect: "postgres",
        repositoryMode:true,
        dialectModule: pg,
        pool: {
          max: 100,
          min: 0,
          idle: 1000,
          acquire: 2000,
        },
      })
  static getInstance() {
    if (!SequelizeSingleton.instance) {
      SequelizeSingleton.instance =  new SequelizeSingleton()}
    return SequelizeSingleton.instance;
  }
  get orm(){
    return this.sequelize
  }
}

export const seqlize = SequelizeSingleton.getInstance().orm
