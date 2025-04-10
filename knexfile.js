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
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DB,
      port: process.env.DB_PORT,
    },
  },
};
