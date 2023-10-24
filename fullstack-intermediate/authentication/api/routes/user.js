const userRoute = require('express').Router()
const UserController = require('../controllers/UserController')

userRoute.get('/', UserController.getAllUsers)
userRoute.post('/register', UserController.register)
userRoute.post('/login', UserController.login)
userRoute.put('/:id', UserController.update)
userRoute.delete('/:id', UserController.delete)
userRoute.get('/account/:id', UserController.getUserById)

module.exports = userRoute