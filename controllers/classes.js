const { Class, User, UserClass } = require('../models/index');
const { Op } = require("sequelize");
const starMaker = require('../helpers/starMaker')
class ClassController {
    static getAll(req, res) {
        let err = req.query.err

        Class
            .findAll({
                include: {
                    model: User,
                    as: 'owner',
                    where: {
                        is_instructor: {
                            [Op.eq]: 'true'
                        }
                    },
                    attributes: ['name']
                }
            })
            .then(listClass => {
                res.render('listClass', {listClass, err, starMaker})
            })
            .catch(err=> console.log(err))
    }

    static getAddClass(req, res) {
        if (req.session.is_instructor) {
            User
            .findAll({
                where: {
                    is_instructor: {
                        [Op.eq]: 'true'
                    }
                },
                attributes: ['name', 'id']
            })
            .then(listInstructor => {
                console.log(listInstructor);
                res.render('addClass', {listInstructor})
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
        } else {
            let error = ['Anda bukan Instructor']

            res.redirect(`/classes?err=${error}`)        
        }
        
    }

    static postAddClass(req, res) {
        let newClass = {
            name_class: req.body.name_class,
            quota: req.body.quota,
            level: req.body.level,
            InstructorId: req.body.InstructorId,
        }

        Class
            .create(newClass)
            .then(data => {
                res.redirect('/classes')
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    static getEnroll(req, res) {
        let ClassId = +req.params.ClassId
        let UserId = req.session.UserId
        let is_instructor = req.session.is_instructor

        if (!is_instructor) {
            UserClass
                .create({
                    ClassId,
                    UserId
                })
                .then(result => {
                    return Class.findByPk(ClassId)
                })
                .then(theClass => {
                    let quota = +theClass.quota - 1
                    return Class.update({
                        quota
                    }, {
                        where: {
                            id: ClassId
                        }
                    })
                })
                .then(result => {
                    res.redirect('/classes')                    
                })
                .catch(err => {
                    console.log(err);
                    res.send(err)
                })
        } else {
            let error = ['Anda bukan student']
            res.redirect(`/classes?err=${error}`)
        }
        // console.log(UserId, ClassId, is_instructor);

    }

    static getMyClasses(req,res){
        let UserId = req.session.UserId

        User.findByPk(UserId,{
            include:{
                model: Class
            }
        })
            .then(result => res.render('myClasses', {result}))

    }
    static delete(req,res){
        let ClassId = +req.params.ClassId
        let UserId = req.session.UserId


        UserClass.destroy({
            where:{
                [Op.and]:[
                    {ClassId: ClassId},
                    {UserId: UserId}
                ]
            }
        })
            .then(result => {
                return Class.findByPk(ClassId)
            })
            .then(theClass => {
                let quota = +theClass.quota + 1
                return Class.update({
                    quota
                }, {
                    where: {
                        id: ClassId
                    }
                })
            })
            .then(res.redirect('/classes/myClasses'))
            .catch(err=> console.log(err))
    }

}

module.exports = ClassController