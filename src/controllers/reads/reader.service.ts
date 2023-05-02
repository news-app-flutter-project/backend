import { readerRepository } from "@/database/repositories/reader.repository";

export const readerService = {
  repository: readerRepository,

  async findMostPopularForCategory(category: Category) {
    return await this.repository.mostPopularForCategory(category);
  },

  async findMostPopularForCategoryAndAge(category: Category, age: Age) {
    return await this.repository.mostPopularForCategoryAndAge(category, age);
  },
};
