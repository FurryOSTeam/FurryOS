const mongoose = require('mongoose')
const mongoPath = process.env.mongopath

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    }),

  function ping() {
		const currentNano = process.hrtime();
	  mongoose.connection.db.command({ ping: 1 });
		const time = process.hrtime(currentNano);
		return (time[0] * 1e9 + time[1]) * 1e-6;
	}
  return mongoose
}