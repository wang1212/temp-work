/**
 * GraphQL - Role
 */
import { gql } from 'apollo-server-koa'

export const typeDefs = gql`
	# object type
	type Role {
		"DB 数据库 ID"
		_id: String
		name: String
		type: String
	}

	# # read
	# extend type Query {
	# }

	# # write
	# type Mutation {
	# }
`

export const resolvers = {
	// read
	Query: {},
	// write
	Mutation: {},
	// sub
	Role: {}
}

export default {
	typeDefs,
	resolvers
}
