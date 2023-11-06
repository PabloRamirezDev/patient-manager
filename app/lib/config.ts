export const CONFIG = {
  NODE_ENV: process.env.NODE_ENV,

  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_PORT: parseInt(process.env.MYSQL_PORT),
  MYSQL_DB: process.env.MYSQL_DB,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,

  PAGES_SLUG: "patient-manager",

  MAILER_HOST: process.env.MAILER_HOST,
  MAILER_PORT: parseInt(process.env.MAILER_PORT),
  MAILER_USER: process.env.MAILER_USER,
  MAILER_PASSWORD: process.env.MAILER_PASSWORD,

  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  S3_BUCKET: process.env.S3_BUCKET,
  S3_REGION: process.env.S3_REGION,
};

Object.entries(CONFIG).forEach(([varname, value]) => {
  if (!value) {
    throw new Error(`Environment variable ${varname} is not set.`);
  }
});
