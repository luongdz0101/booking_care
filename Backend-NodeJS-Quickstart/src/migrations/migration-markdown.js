'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Markdowns', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contentHtml: {
        type: Sequelize.TEXT('long'),
        allowNull: false
    },
      contentMarkdown: {
        type: Sequelize.TEXT('long'),
        allowNull: false
    },
      description: {
        type: Sequelize.TEXT('long'),
        allowNull: false
    },
      doctorId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      specialtyId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      clinicId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Markdowns');
  }
};