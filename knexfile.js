import "dotenv/config";

const commonConfig = {
  client: "pg",
  migrations: {
    directory: "./src/database/migrations",
    extension: "js",
  },
  seeds: {
    directory: "./src/database/seeds",
  },
};

export default {
  development: {
    ...commonConfig,
    connection: {
      host: "localhost",
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      port: process.env.POSTGRES_PORT,
    },
  },
};
