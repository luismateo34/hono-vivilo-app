import { loadEnvFile } from "node:process";
import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
});

class DotenvObj {
  private constructor() {
    this.init();
  }
  //-------------------
  private init() {
    if (process.env.NODE_ENV === "development") {
      try {
        loadEnvFile("./.env");
        logger.info("✅ Variables de entorno cargadas desde .env");
      } catch (e) {
        logger.warn(
          "⚠️ Advertencia: No se encontró el archivo .env, se usarán variables del sistema.",
        );
      }
    }
  }
  //--------------------
  static instance: DotenvObj;
  static getInstance() {
    if (!DotenvObj.instance) {
      DotenvObj.instance = new DotenvObj();
    }
    return DotenvObj.instance;
  }
}
DotenvObj.getInstance();
//export default DotenvObj.getInstance();
