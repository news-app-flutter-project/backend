import { Sequelize } from "sequelize";
import db from "@/database/db";
import { dbException } from "@/common/exceptions";
import { ReadsCreateInterface } from "@/database/models/reads.model";

export const readsRepository = {
  async readNews(reads_data: ReadsCreateInterface) {
    try {
      return await db.Reads.create(reads_data);
    } catch (err) {
      dbException(err);
    }
  },

  async checkDuplicateReads(profile_id: number, news_id: number) {
    try {
      const existingRead = await db.Reads.findOne({
        where: {
          profile_id,
          news_id,
        },
      });
      return !!existingRead; // Returns true if the read already exists, false otherwise
    } catch (err) {
      dbException(err);
    }
  },
};
