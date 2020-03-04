/**
 * GraphQL - User
 */
import { gql } from 'apollo-server-koa'

export const typeDefs = gql`
	# object type
	type User {
		"DB 数据库 ID"
		_id: String
		username: String
		password: String
		name: String
		roles: [Role]
	}

	# response type
	type SignInMutationResponse implements MutationResponse {
		code: String!
		success: Boolean!
		message: String!
		token: String
	}

	# read
	extend type Query {
		users: [User]
		signUser: User
	}

	# write
	type Mutation {
		signIn(username: String): SignInMutationResponse
	}
`

export const resolvers = {
	// read
	Query: {
		users: async (_, __, { services }) => await services.User.getUser(),
		signUser: (_, __, { user }) => user
	},
	// write
	Mutation: {
		signIn: (_, { username, password }) => {
			return { username, password }
		}
	},
	// sub
	User: {
		roles: async (parent, _, { services }) => await services.Role.getRoleByUser(parent._id)
	}
}

export default {
	typeDefs,
	resolvers
}
