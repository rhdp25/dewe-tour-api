"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("users", [
      {
        fullName: "admin",
        email: "admin@mail.com",
        password: "$2a$10$lXiJLZuwHYRKR26GD3ekTuiHzyEfPA.Lrrg/IULNM2LSbfth8WF/y",
        phone: "-",
        address: "-",
        gender: "-",
        photo: "-",
        role: "admin",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
