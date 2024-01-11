'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      specialty.hasMany(models.Doctor_info, {foreignKey: 'specialtyId', as: 'specialtyData'})
    }
  };
 specialty.init({
    descriptionMarkdown: DataTypes.TEXT,
    descriptionHtml: DataTypes.TEXT,
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName:  'specialty',
  });
  return specialty;
};