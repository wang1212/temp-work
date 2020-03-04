/**
 * Role model
 */
// eslint-disable-next-line
import mongoose, { Schema } from 'mongoose'

/* schema */
const schema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	type: {
		type: String,
		required: true,
		immutable: true,
		unique: true
	}
})

/**
 * Model Factory
 *
 * @export
 * @param {*} conn - db
 * @returns {mongoose.Model}
 */
export function ModelFactory(conn) {
	return conn.model('Role', schema)
}

export default ModelFactory
