'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor_cs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Doctor_cs.init({
    doctorID: DataTypes.INTEGER,
    clinicID: DataTypes.INTEGER,
    specialtyID: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'Doctor_cs',
  });
  return Doctor_cs;
};


