const express = require('express')
const QuestionController = require('./controllers/QuestionController')
const questionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

const route = express.Router()

route.get('/', (req, res) => res.render("index")) // Minha rota inicial para -> index.ejs
route.get('/create-pass', (req, res) => res.render("create-pass"))  // Minha rota para -> create-pass

route.post('/create-room', RoomController.create) // arquivo que irá trabalhar com as salas
route.get('/room/:room', RoomController.open)

route.post('/enterroom', RoomController.enter)
route.post('/question/create/:room', QuestionController.create)
route.post('/question/:room/:question/:action', questionController.index ) // arquivo que irá trabalhar com as questions

module.exports = route