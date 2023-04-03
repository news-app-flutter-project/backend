"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("news", {
      type: "unique",
      fields: ["title"],
      name: "unique_title",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("news", "unique_title");
  },
};
