'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Clinic.hasMany(models.Doctor_info, {foreignKey: 'clinicId', as: 'clinicData'})
      
    }
  };
  Clinic.init({
    address: DataTypes.STRING,
    descriptionMarkdown: DataTypes.TEXT,
    descriptionHtml: DataTypes.TEXT,
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    
   
    
  }, {
    sequelize,
    modelName: 'Clinic',
  });
  return Clinic;
};