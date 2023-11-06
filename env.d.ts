namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";

    MYSQL_HOST: string;
    MYSQL_PORT: string;
    MYSQL_DB: string;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;

    MAILER_HOST: string;
    MAILER_PORT: string;
    MAILER_USER: string;
    MAILER_PASSWORD: string;

    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    S3_REGION: string;
    S3_BUCKET: string;
  }
}
