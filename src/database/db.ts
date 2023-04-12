import { Sequelize } from "sequelize";
import { SEQUELIZE_CONFIGS } from "@/common/constants";
import { NewsModel, NewsModelGenerator } from "@/database/models/news.models";
import {
  UserAuthModel,
  UserAuthGenerator,
} from "@/database/models/user.auth.model";
import { TestModel, initTestModel } from "./models/user.profile.models";
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
    UserAuth: typeof UserAuthModel;
    Test: typeof TestModel;
  }
}

const db: DB = {
  Sequelize,
  sequelize,
  News: NewsModelGenerator(sequelize),
  UserAuth: UserAuthGenerator(sequelize),
  Test: initTestModel(sequelize),
};

export default db;
