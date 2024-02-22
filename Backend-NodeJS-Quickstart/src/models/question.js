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
    email: DataTypes.STRING,
    fullName: DataTypes.STRING, 
    address: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    question: DataTypes.TEXT,
    image: DataTypes.STRING,
    reply: DataTypes.TEXT,
    
  }, {
    sequelize,
    modelName:  'question',
  });
  return question;
};