declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_ENVIROMENT: "SERVER" | "CLOUD";
      DATABASE_URL_HOST: string;
      DATABASE_URL_PORT: string;
      DATABASE_NAME: string;
      DATABASE_USER_DEFAULT:string;
      DATABASE_PASSWORD_DEFAULT: string;
      SECRET: string;
      SECRET_ADMIN: string;
      NODE_ENV:"development" | "test" | "production";
      TOKEN_SECRET: string;
      MP_ACCESS_TOKEN: string;
      MP_SECRET_KEY: string;
      MP_SECRET_KEY: string;
    }
  }
}

export {};
