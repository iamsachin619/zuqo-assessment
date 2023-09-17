const express  = require('express')
const routes = express.Router()
//const {addbooksctrl} = require('../controllers/books.js')
const usersCtrls = require('../controllers/user.js')


routes.get('/users', usersCtrls.getUsers )
routes.delete('/users/:id', usersCtrls.deleteUser)
routes.get('/seedData', usersCtrls.createFakeData)

module.exports = routes