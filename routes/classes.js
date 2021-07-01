const router = require('express').Router();
const Controller = require('../controllers/classes');

router.get('/', Controller.getAll)
router.get('/add', Controller.getAddClass)
router.post('/add', Controller.postAddClass)
router.get('/:ClassId/enroll', Controller.getEnroll)

router.get('/myClasses', Controller.getMyClasses)
router.get("/:ClassId/delete", Controller.delete)
//  router.get("/:ClassId/chat", Controller.delete)


module.exports = router