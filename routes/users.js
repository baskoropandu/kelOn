const router = require('express').Router();
const Controller = require('../controllers/users')
router.get('/students', Controller.getStudents)
router.get('/instructors', Controller.getInstructors)

module.exports = router