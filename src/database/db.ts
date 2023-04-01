import { Sequelize } from "sequelize";
import { SEQUELIZE_CONFIGS } from "@/common/constants";
import { NewsModel, NewsModelGenerator } from "@/database/models/news.models";

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
    News: typeof NewsModel;
  }
}

const db: DB = {
  Sequelize,
  sequelize,
  News: NewsModelGenerator(sequelize),
};

export default db;
