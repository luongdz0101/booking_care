'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Doctor_info.belongsTo(models.User, { foreignKey: 'doctorId'})
      
      Doctor_info.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'typePriceData'})
      Doctor_info.belongsTo(models.Allcode, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'typeProvinceData'})
      Doctor_info.belongsTo(models.Allcode, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'typePaymentData'})

      Doctor_info.belongsTo(models.specialty, { foreignKey: 'specialtyId', as: 'specialtyData'})

      Doctor_info.belongsTo(models.Clinic, { foreignKey: 'clinicId', as: 'clinicData'})

     
    }
  };
  Doctor_info.init({
    doctorId: DataTypes.INTEGER,
    specialtyId: DataTypes.INTEGER,
    clinicId: DataTypes.INTEGER,
    priceId:  DataTypes.STRING,
    provinceId: DataTypes.STRING,
    paymentId: DataTypes.STRING,
    addressClinic: DataTypes.STRING,
    nameClinic: DataTypes.STRING,
    note: DataTypes.STRING,
    count: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Doctor_info',
  });
  return Doctor_info;
};


