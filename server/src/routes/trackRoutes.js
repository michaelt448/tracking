const express = require('express')
const mongoose = require('mongoose')
const requirerAuth = require('../middleware/requirerAuth')

const router = express.Router()
const Track = mongoose.model('Track')

router.use('/api', requirerAuth)

router.get('/api/tracks', async (req, res) => {
  const tracks = await Track.find({ author: req.user.id })
  res.status(200).send({ tracks: tracks })
})

router.get('/api/track/:id', async (req, res) => {
  const { id } = req.params
  const track = await Track.findById(id).catch(err => {
    console.log('Failed to get',  err)
  })

  if (track && track.author.toString() === req.user.id.toString()) {
    return res.status(200).send({ track })
  }

  res.status(400).send('Invalid request')
})

router.post('/api/tracks', async (req, res) => {
  let { name, locations } = req.body
  const { user } = req

  if (!name || !locations) {
    return res.status(400).send({ error: 'Invalid params'})
  }
  try {
    const newTrack = new Track({ name, locations, author: user.id })
    await newTrack.save()
    return res.status(200).send({ track : newTrack })
  } catch (err) {
    console.log(err)
    return res.status(422).send({ error: 'Weird error:', err})
  }
})

router.patch('/api/track/:id', async (req, res) => {
  const { id } = req.params
  const { name, location } = req.body

  updates = {}
  if (name) updates.name = name
  if (location) updates.location = location

  const updatedTrack = await Track.findByIdAndUpdate(id, { ...updates })
  res.status(200).send( { track: updatedTrack })
})

router.delete('/api/track/:id', async (req, res) => {
  const { id } = req.params

  const track = await Track.findById(id)
  if (req.user.id.toString() === track.author.toString()) {
    await track.delete()
    return res.status(200).send({ _id: id })
  }
  res.status(400).send('Invalid request')
})

module.exports = router