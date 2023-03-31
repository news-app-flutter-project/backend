import { Sequelize } from "sequelize";
import { SEQUELIZE_CONFIGS } from "@/common/constants";

const sequelize = new Sequelize(SEQUELIZE_CONFIGS);

declare global {
  interface TimeStampModel {
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
  }

  interface DB {
    Sequelize: typeof Sequelize;
    sequelize: Sequelize;
  }
}

const db: DB = {
  Sequelize,
  sequelize,
};

export default db;
