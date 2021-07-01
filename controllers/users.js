const {User, Class, UserClass} = require('../models')
const {Op} = require('sequelize')

class Users{
    static getStudents(req,res){
        User
            .getStudent(Class)
            .then(result=> {
                // console.log(result);
                // res.send(result)
                res.render('students',{ students: result})
            })
    }
    static getInstructors(req,res){
        User
        .getInstructor(Class)
        .then(result=> {
            res.render('instructors',{ instructors: result})
        })
    }
}


module.exports = Users