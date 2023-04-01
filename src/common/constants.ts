import { Dialect, Options } from "sequelize/types";
export const PORT = Number(process.env.PORT || 5000);

export const SEQUELIZE_CONFIGS: Options = {
  dialect: String(process.env.DB_TYPE || "mysql") as Dialect,
  database: String(process.env.DB_NAME || ""),
  host: String(process.env.DB_HOST || "127.0.0.1"),
  port: Number(process.env.DB_PORT || 3306),
  username: String(process.env.DB_USER || "root"),
  password: String(process.env.DB_PASSWORD || ""),
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
    underscored: true,
    freezeTableName: true,
  },
  logging: (msg) => {
    if (msg.startsWith("Executing (default): SELECT 1+1 AS result")) {
      console.log("Successfully connected to database");
    } else {
      console.log(msg);
    }
  },
};
