import { CONFIG } from "./config";
import knex from "knex";

export const db = knex({
  client: "mysql2",
  connection: {
    host: CONFIG.MYSQL_HOST,
    port: CONFIG.MYSQL_PORT,
    user: CONFIG.MYSQL_USER,
    password: CONFIG.MYSQL_PASSWORD,
    database: CONFIG.MYSQL_DB,
  },
  pool: { min: 0, max: 5 },
  migrations: {
    tableName: "knex_migrations",
  },
});