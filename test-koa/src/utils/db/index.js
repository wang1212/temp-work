/**
 * mongoDB utils
 */
import mongoose from 'mongoose'
import chalk from 'chalk'

/* connect */
mongoose.connect('mongodb://localhost:27017/koa', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).catch(err => {
	console.log(chalk.red(err.message))
})

/* connect events */
mongoose.connection.on('connected', () => {
	console.log(chalk.cyan('mongoDB connected success!'))
})

mongoose.connection.on('error', err => {
	console.log(chalk.red(err.message))
})

export default mongoose.connection
