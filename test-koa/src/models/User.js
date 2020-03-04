/**
 * User model
 */
// eslint-disable-next-line
import mongoose, { Schema } from 'mongoose'

/* schema */
const schema = new Schema({
	username: {
		type: String,
		required: true,
		immutable: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String,
		default: '未命名'
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
	return conn.model('User', schema)
}

export default ModelFactory
