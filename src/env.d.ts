declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_ENVIROMENT: "SERVER" | "CLOUD";
      POSTGRES_URL: string;
      NEON_URL: string;
      SECRET: string;
      SECRET_ADMIN: string;
      TOKEN_SECRET: string;
      MP_ACCESS_TOKEN: string;
      MP_SECRET_KEY: string;
      MP_SECRET_KEY: string;
    }
  }
}

export {};
