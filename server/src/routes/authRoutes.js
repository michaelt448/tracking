const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const router = express.Router()
const User = mongoose.model('User')

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body
    if (email && password) {
      const user = new User({ email, password })
      await user.save()
      const token = jwt.sign( { userId: user.id}, 'MY_SECRET_KEY')
      return res.status(200).send({ token })
    } else {
      throw new Error('No credentials found')
    }
  } catch (err) {
    res.status(422).send('Please use different email')
  }
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && user.comparePassword(password)) {
    const token = jwt.sign( { userId: user.id}, 'MY_SECRET_KEY')
    res.status(200).send({ token })
  } else {
    res.status(401).send('Needs to be signed in')
  }
})

module.exports = router