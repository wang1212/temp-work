// server

import Koa from 'koa'
import DB from './utils/db'
import bodyParser from 'koa-bodyparser'
import router from './router'
import chalk from 'chalk'
import log4js from 'koa-log4'
import getLogger from './utils/log4js'

const app = new Koa()

/* app context */
// DB
app.context.db = DB

/* Middleware */
// logs
app.use(getLogger())
app.use(getLogger('access'))

app.use(bodyParser())

// router
app.use(async (ctx, next) => {
	// root page
	if (ctx.req.url == '/') {
		ctx.body = '<h1>Koa Server</h1>'
	}

	await next()
})

app.use(router.routes()).use(router.allowedMethods())

/* error handle */
app.on('error', (err, ctx) => {
	log4js.getLogger('error').error(err, ctx.request)
	console.log(chalk.red(err.message))
})

app.listen(3000, error => {
	if (error) {
		log4js.getLogger('error').error(error)
		return console.log(chalk.red(error.message))
	}
	console.log(chalk.cyan('server running on port 3000 ...'))
})
