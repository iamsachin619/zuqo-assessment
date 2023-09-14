const express  = require('express')
const routes = express.Router()
//const {addbooksctrl} = require('../controllers/books.js')
const booksCtrls = require('../controllers/books.js')


routes.get('/books', booksCtrls.getBooks )
routes.delete('/books/:id', booksCtrls.deleteBook)


module.exports = routes