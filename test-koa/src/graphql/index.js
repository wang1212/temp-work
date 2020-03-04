/* graphQL server */

import { ApolloServer, gql } from 'apollo-server-koa'
import User from './User'
import Role from './Role'
import AuthServiceFactory from '../services/Auth'
import UserServiceFactory from '../services/User'
import RoleServiceFactory from '../services/Role'

/* Schema */
const typeDefs = [
	gql`
		# interface
		interface MutationResponse {
			code: String!
			success: Boolean!
			message: String!
		}

		# read
		type Query {
			hello(name: String): String
		}
	`,
	User.typeDefs,
	Role.typeDefs
]

/* Resolvers */
const resolvers = {
	// interface
	MutationResponse: {
		__resolveType() {
			// return 'SignInMutationResponse'
		}
	},
	// read
	Query: {
		hello: (_, { name }) => 'Hello World! ' + name,
		...User.resolvers.Query,
		...Role.resolvers.Query
	},
	// write
	Mutation: {
		...User.resolvers.Mutation,
		...Role.resolvers.Mutation
	},
	// object
	User: User.resolvers.User,
	Role: Role.resolvers.Role
}

/**
 * Context Manage
 */
async function contextManage({ ctx }) {
	// api service
	const services = {
		Auth: AuthServiceFactory(ctx),
		User: UserServiceFactory(ctx),
		Role: RoleServiceFactory(ctx)
	}

	// simple auth check on every request
	let { user } = ctx.state

	if (user) {
		// token 未过期，但是否被销毁
		const authTokens = await services.Auth.getToken({ user: user._id, authorization: ctx.headers['authorization'] })

		if (authTokens.length) {
			const users = await services.User.getUser({ username: user.username })

			user = ctx.state.user = users[0]
		} else {
			user = ctx.state.user = null
		}
	}

	return { user, services }
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: contextManage,
	debug: true,
	tracing: false
})

export default server
