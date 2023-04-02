"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn("news", "id", {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    });

    await queryInterface.addColumn("news", "gpt_keywords", {
      type: DataTypes.JSON,
      allowNull: true,
    });
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn("news", "id");
    await queryInterface.removeColumn("news", "gpt_keywords");
  },
};
