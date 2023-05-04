import { Sequelize } from "sequelize";
import { SEQUELIZE_CONFIGS } from "@/common/constants";
import { NewsModel, NewsGenerator } from "@/database/models/news.models";
import { AuthModel, AuthGenerator } from "@/database/models/auth.model";
import { ProfileModel, ProfileGenerator } from "./models/profile.models";
import { ReaderModel, ReaderGenerator } from "./models/reader.model";
import { relations } from "./relations";
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
    Auth: typeof AuthModel;
    Profile: typeof ProfileModel;
    Reader: typeof ReaderModel;
  }
}

const db: DB = {
  Sequelize,
  sequelize,
  News: NewsGenerator(sequelize),
  Auth: AuthGenerator(sequelize),
  Profile: ProfileGenerator(sequelize),
  Reader: ReaderGenerator(sequelize),
};

relations(db);

export default db;
