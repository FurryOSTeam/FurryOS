const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  warnings: {
    type: [Object],
    required: true,
  },
})

module.exports = mongoose.model('warn', profileSchema)