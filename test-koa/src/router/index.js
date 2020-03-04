/**
 * App routes
 */
import Router from '@koa/router'
import GraphQLServer from '../graphql'
import jwt from 'koa-jwt'
import { SECRET } from '../utils/auth'
import AuthServiceFactory from '../services/Auth'

const router = new Router({ prefix: '/app' })

// Authorization
router.all('/signIn', async ctx => await AuthServiceFactory(ctx).signIn())

// jwt
router.use(jwt({ secret: SECRET, passthrough: true }).unless({ path: [/^\/app\/public/] }))

// Unprotected resources
router.use('/public', async (ctx, next) => {
	await next()
	ctx.body = 'Unprotected resources'
})

// Protected resources - GraphQL Server
router.use(GraphQLServer.getMiddleware({ path: '/app/graphql' }))

router.all('*', async (ctx, next) => {
	await next()
})

export default router
