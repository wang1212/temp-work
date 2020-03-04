/**
 * Resource permission operation
 */
// eslint-disable-next-line
import mongoose, { Schema } from 'mongoose'

/* schema */
const schema = new Schema({
	name: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true,
		immutable: true
	},
	code: {
		type: Number,
		required: true,
		immutable: true,
		unique: true
	},
	text: {
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
	return conn.model('Operation', schema)
}

export default ModelFactory
