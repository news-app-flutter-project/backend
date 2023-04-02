"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const columns = await queryInterface.describeTable("news");

    if (!columns.id) {
      await queryInterface.addColumn("news", "id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      });
    }

    await queryInterface.addColumn("news", "gpt_keywords", {
      type: Sequelize.JSON,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("news", "id", {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    });
  },
};
