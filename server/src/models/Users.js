const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String
  }
})

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function(passwordCandidate) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(passwordCandidate, this.password, (err, isMatch) => {
      if (err || !isMatch) {
        reject(false)
      }
      resolve(true)
    })
  })
}

mongoose.model('User', userSchema)