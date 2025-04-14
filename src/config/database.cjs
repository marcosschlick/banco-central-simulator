require("dotenv").config();

module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "postgres",
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
};
