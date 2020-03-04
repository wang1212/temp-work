/**
 * User && Role model
 */
// eslint-disable-next-line
import mongoose, { Schema } from 'mongoose'

/* schema */
const schema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		immutable: true,
		ref: 'User'
	},
	role: {
		type: Schema.Types.ObjectId,
		required: true,
		immutable: true,
		ref: 'Role'
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
	return conn.model('UserRole', schema)
}

export default ModelFactory
