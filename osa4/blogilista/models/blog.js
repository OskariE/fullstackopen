const config = require('../utils/config')
const logger = require('../utils/logger')
const mongoose = require('mongoose')

const url = config.MONGODB_URI

mongoose.connect(url)
  .then(
    logger.info('connected to MongoDB')
  )
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)