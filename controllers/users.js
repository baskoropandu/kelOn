const {User, Class, UserClass} = require('../models')
const {Op} = require('sequelize')

class Users{
    static getStudents(req,res){
        User
            .findAll({
                where:{
                    is_instructor: {
                        [Op.eq]: 'false'
                    }
                },
                include:{
                    model: 'Class'
                }
            })
            .then(result=> {
                // console.log(result);
                // res.send(result)
                res.render('students',{ students: result})
            })
            .catch(err=>{
                console.log(err);
                res.send(err)
            })
    }
    static getInstructors(req,res){
        User.findAll({
            where:{
                is_instructor: {
                    [Op.eq]: 'true'
                }
            },
            include:{
                model: 'Class',
                as: 'classes'
            }
        })
        .then(result=> {
            res.render('instructors',{ instructors: result})
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        })
    }
}


module.exports = Users