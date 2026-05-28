import { ModelCtor, Sequelize } from "sequelize-typescript";
import { Options } from "sequelize";
import pg from "pg";

const BASE_OPTIONS: Options = {
  host: process.env.DATABASE_URL_HOST,
  port: parseInt(process.env.DATABASE_URL_PORT),
  database: process.env.DATABASE_NAME,
  dialect: "postgres",
  dialectModule: pg,
  logging: false, // Cambiar a console.log en desarrollo si lo necesitas
  pool: {
    max: 5, // Conexiones máximas por cada usuario de la BD
    min: 0,
    idle: 10000, // Cierra conexiones inactivas tras 10 segundos
    acquire: 2000, // Tiempo límite para obtener conexión antes de lanzar timeout
  },
};

class SequelizeSingleton {
  static instance: SequelizeSingleton;
  private instancesMap: Map<string, Sequelize> = new Map();
  private ormSequelize: Sequelize;
  //-------------------
  getCreateInstance(user: string, password: string, model: string[] | ModelCtor[]): Sequelize {
    if (!this.instancesMap.has(user)) {
      const sequelizeOrm = new Sequelize({
        ...BASE_OPTIONS,
        username: user,
        password: password,
	models:model
      });
      this.instancesMap.set(user, sequelizeOrm);
      return sequelizeOrm;
    }
    return this.instancesMap.get(user)!;
  }
  //------------------------------
  private constructor() {
    this.ormSequelize = new Sequelize({
      ...BASE_OPTIONS,
      username: process.env.DATABASE_USER_DEFAULT,
      password: process.env.DATABASE_PASSWORD_DEFAULT,
    });
  }
  //-------------
  static getInstance(): SequelizeSingleton {
    try {
      const dbUrl = process.env.DATABASE_URL_PORT;
      if (!dbUrl) {
        console.error(
          "❌ Error crítico: process.env.POSTGRES_URL no está definido.",
        );
        process.exit(1);
      }
      //------------------
      if (!SequelizeSingleton.instance) {
        SequelizeSingleton.instance = new SequelizeSingleton();
      }
      //--------
      return SequelizeSingleton.instance;
    } catch (error) {
      console.error(
        "❌ Error crítico: No se pudo conectar a la base de datos al arrancar.",
      );
      console.error(error);
      process.exit(1);
    }
  }
  /**
  * metodo para el usuario por defecto
  */
  get orm() {
    return this.ormSequelize;
  }
}

/**
exportacion por default con el usuario y contraseña por default
*/
export const seqlize = SequelizeSingleton.getInstance().orm;
/**
exportacion para usarios con diferentes permisos para la base de datos
*/
export const seqlizeUserADD = (user: string, password: string, model: string[] | ModelCtor[]) =>
  SequelizeSingleton.getInstance().getCreateInstance(user, password,model);
