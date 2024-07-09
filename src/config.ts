import { config as loadDotEnv } from "dotenv";

loadDotEnv();

export const config = {
  env: process.env.NODE_ENV || "development",
  app: {
    port: Number(process.env.PORT || 3000),
  },
  external_api: {
    chuck: String(process.env.URL_CHUCK_API),
    dad: String(process.env.URL_DAD_API),
  },
  db: {
    type: String(process.env.DB_TYPE),
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_DATABASE),
    logging: Boolean(process.env.DB_LOGGING),
    synchronize: Boolean(process.env.DB_SYNCHRONIZE),
    migrations: [String(process.env.DB_MIGRATIONS_RUN)],
  },
};

export default config;
