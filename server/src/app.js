require('./models/Users')
require('./models/Track')
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRouter = require('./routes/authRoutes')
const trackRouter = require('./routes/trackRoutes')

// DB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true
})

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo')
})

mongoose.connection.on('error', (err) => {
  console.log('error connecting', err)
})

// Add routing
app.use(bodyParser.json())
app.use(trackRouter)
app.use(authRouter)

app.get('/ping', (req, res) => {
  res.status(200).send('OK')
})

app.listen(3010, () => {
  console.log('Started the server, running on 3010')
})