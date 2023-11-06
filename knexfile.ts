import type { Knex } from "knex";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

import { CONFIG } from "./app/lib/config";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      port: CONFIG.MYSQL_PORT,
      host: CONFIG.MYSQL_HOST,
      database: CONFIG.MYSQL_DB,
      user: CONFIG.MYSQL_USER,
      password: CONFIG.MYSQL_PASSWORD,
    }
  }
};

module.exports = config;
