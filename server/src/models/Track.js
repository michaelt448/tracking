const mongoose = require('mongoose')

const pointSchema = new mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longtitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number
  }
})

const trackSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  locations: {
    type: [pointSchema],
    required: false
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  }
})

mongoose.model('Track', trackSchema)