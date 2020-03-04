/**
 * GraphQL utils
 */
import ApolloClient, { gql } from 'apollo-boost'

const client = new ApolloClient({
	uri: 'http://localhost:3000/app/graphql'
})

async function query() {
	try {
		const users = await client.query({
			query: gql`
				{
					users {
						_id
						username
						password
						name
						roles {
							_id
							name
							type
						}
					}
				}
			`
		})

		console.log(users)
	} catch (err) {
		console.log(err.message)
	}
}

query()
query()
