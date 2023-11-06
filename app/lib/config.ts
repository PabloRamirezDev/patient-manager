export const CONFIG = {
  NODE_ENV: process.env.NODE_ENV,
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_PORT: parseInt(process.env.MYSQL_PORT),
  MYSQL_DB: process.env.MYSQL_DB,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  PAGES_SLUG: "patient-manager",
};

Object.entries(CONFIG).forEach(([varname, value]) => {
  if (!value) {
    throw new Error(`Environment variable ${varname} is not set.`);
  }
});
