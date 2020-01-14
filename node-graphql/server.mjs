/**
 *
 */
import express from 'express'
import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'


const schema = buildSchema(`
	type Query {
		rollDice(numDice: Int!, numSides: Int): [Int]
	}
`)

const root = {
	rollDice: ({ numDice, numSides }) => {
		const output = []

		for (let i = 0; i < numDice; i++) {
			output.push(1 + Math.floor(Math.random() * (numSides || 6)))
		}

		return output
	}
}


// server
const app = express()

app.use('/graphql', graphqlHTTP({
	schema,
	rootValue: root,
	// graphiql: true
}))

app.listen(8000)

console.log('Running a GraphQL API server at localhost:8000/graphql')