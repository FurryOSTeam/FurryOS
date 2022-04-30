const mongoose = require('mongoose');
const mongoPath = process.env.mongopath

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    })
  return mongoose
}