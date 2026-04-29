declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_ENVIROMENT: "SERVER" | "CLOUD";
      POSTGRES_URL: string;
      NEON_URL: string;
      SECRET: string;
      SECRET_ADMIN: string;
      AUTH_GOOGLE_ID: string;
      AUTH_GOOGLE_SECRET: string;
      RESEND_EMAIL: string;
      MAIL_BUSINESS: string;
      DOMAIN: string;
      SECRET_PAGE_PASS: string;
      TOKEN_SECRET: string;
    }
  }
}

export {};
