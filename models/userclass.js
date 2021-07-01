'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // UserClass.belongsTo(models.User, {foreignKey: 'UserId'})
      // UserClass.belongsTo(models.Class, {foreignKey: 'ClassId'})

    }
  };
  UserClass.init({
    ClassId:  DataTypes.INTEGER,     
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserClass',
  });
  return UserClass;
};