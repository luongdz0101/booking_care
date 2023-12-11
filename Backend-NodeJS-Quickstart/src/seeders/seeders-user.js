'use strict';

module.exports = {
 

  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '123456',
      firstName: 'Hong Luong',
      lastName: 'Doan',
      address: 'Bang Giang',
      gender: '1',
      roleID: 'R1',
      phoneNumber: '0358275139',
      positionId: '',
      image: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
