const router = require('express').Router()
const userController = require('../controllers/userController')
const { verifyToken } = require('../middlewares/verifyToken')
const { verifyRole } = require('../middlewares/verifyRole')

router.post('/v1/user/register', userController.register)

router.post('/v1/user/login', userController.signin)

router.get('/v1/users', verifyToken, verifyRole(["admin"]), userController.getUsers)



module.exports = router