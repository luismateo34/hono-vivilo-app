import { Sequelize } from "sequelize-typescript";
import pg from "pg";

class SequelizeSingleton {
  static instance: SequelizeSingleton;
  private sequelize: Sequelize;
  //-------------------
  private constructor(url: string) {
    this.sequelize = new Sequelize(url, {
      dialect: "postgres",
      repositoryMode: true,
      dialectModule: pg,
      pool: {
        max: 100,
        min: 0,
        idle: 1000,
        acquire: 10000,
      },
    });
  }
  //-------------
  static getInstance(): SequelizeSingleton {
    try {
      const dbUrl = process.env.POSTGRES_URL;
      if (!dbUrl) {
        console.error(
          "❌ Error crítico: process.env.POSTGRES_URL no está definido.",
        );
        process.exit(1);
      }
      //------------------
      if (!SequelizeSingleton.instance) {
        SequelizeSingleton.instance = new SequelizeSingleton(dbUrl);
      }
      return SequelizeSingleton.instance;
    } catch(error) {
        console.error("❌ Error crítico: No se pudo conectar a la base de datos al arrancar.");
        console.error(error);
        process.exit(1);
    }
  }
  //------------------
  get orm() {
    return this.sequelize;
  }
}

export const seqlize = SequelizeSingleton.getInstance().orm;
