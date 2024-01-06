'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
    }
  };
 question.init({
    descriptionMarkdown: DataTypes.TEXT,
    descriptionHtml: DataTypes.TEXT,
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName:  'question',
  });
  return question;
};