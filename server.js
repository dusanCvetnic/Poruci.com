const express = require('express')
const mongoose = require('mongoose')
const { PORT, MONGO_URI, options } = require('./config')
const fs = require('fs')
const https = require('https')

//Routes
const usersRouter = require('./routes/api/users')
const dishesRouter = require('./routes/api/dishes')
const ordersRouter = require('./routes/api/orders')
const restaurantsRouter = require('./routes/api/restaurants')

const server = express()

//BodyParser
server.use(express.json())

mongoose.connect(MONGO_URI, options)
    .then(() => console.log('Uspesna konekcija na MongoDB bazu!'))
    .catch(err => console.log(err))

//Koriscenje routinga
server.use('/api/user', usersRouter)
server.use('/api/dish', dishesRouter)
server.use('/api/order', ordersRouter)
server.use('/api/restaurant', restaurantsRouter)

server.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

/* https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, server)
  .listen(PORT, function () {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
  }) */