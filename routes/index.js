const router = require('express').Router();
const myLogger = require('../middleware/myLogger');
const classes = require('./classes');
const users = require('./users');
const Controller = require('../controllers/controller');

router.get('/', Controller.home)
router.get('/login', Controller.login)
router.post('/login', Controller.postLogin)
router.get('/register', Controller.register)
router.post('/register', Controller.postregister)

router.use(myLogger)

router.get('/logout', Controller.logout)
router.get('/chat', Controller.chatting)

router.use('/classes', classes)
router.use('/users', users)

module.exports = router