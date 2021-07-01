'use strict';
const {Op} = require('sequelize')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */


    faceMaker(){
      let lv = +this.level
      let output = ``
      for(let i = 0; i < lv; i++){
        output += `㋡`
      }
      return output
    }

    static associate(models) {
      // define association here
      User.hasMany(models.Class, { foreignKey: 'InstructorId', as:'classes' })
      // User.hasMany(models.UserClass,{foreignKey: 'UserId'})
      User.belongsToMany(models.Class, {through: models.UserClass, foreignKey: 'UserId'})
    }

    static getStudent(models) {
      return User
                .findAll({
                        where:{
                            is_instructor: {
                                [Op.eq]: 'false'
                            }
                        },
                        include:{
                            model: models
                        }
                    })

    }

    static getInstructor(models) {
      return User
                .findAll({
                  where:{
                      is_instructor: {
                          [Op.eq]: 'true'
                      }
                  },
                  include:{
                      model: models,
                      as: 'classes'
                  }
                })
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Nama tidak boleh kosong'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email harus ada'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password tidak boleh tidak diisi'
        }
      }
    },
    level: DataTypes.INTEGER,
    is_instructor: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate: (val) => {
        if (!val.level) {
          val.level = 1
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};