"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("News", "category_new", {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.sequelize.query(
      "UPDATE News SET category_new = category WHERE category IS NOT NULL"
    );

    await queryInterface.removeColumn("News", "category");

    await queryInterface.renameColumn("News", "category_new", "category");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("News", "category_new", {
      type: Sequelize.JSON,
      allowNull: true,
    });

    await queryInterface.sequelize.query(
      "UPDATE News SET category_new = JSON_ARRAY(category) WHERE category IS NOT NULL"
    );

    await queryInterface.removeColumn("News", "category");

    await queryInterface.renameColumn("News", "category_new", "category");
  },
};
