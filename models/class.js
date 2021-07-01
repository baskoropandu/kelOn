'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Class.belongsTo(models.User, { foreignKey: 'InstructorId', as: 'owner'})
      
      Class.belongsToMany(models.User, {through: models.UserClass, foreignKey: 'ClassId'})      
    }
  };
  Class.init({
    name_class: DataTypes.STRING,
    quota: DataTypes.INTEGER,
    level: DataTypes.INTEGER    
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};