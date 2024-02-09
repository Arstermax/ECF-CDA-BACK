const outils = require("../utils/outils.js")
const isAuthenticated = require('../../middleware/authentification.js')
const UserController = require('../controllers/UserController.js')

outils.router
    .get('/get/:id', UserController.GetUserById)
    .post('/register',UserController.Register)
    .post('/update/:id',UserController.Update)
    .post('/delete/:id', UserController.Delete)
    .post('/login',UserController.Login)

module.exports = outils.router