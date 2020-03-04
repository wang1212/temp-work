/**
 * Record model
 */
// eslint-disable-next-line
import mongoose, { Schema } from 'mongoose'

/* schema */
const schema = new Schema({
	createAt: {
		type: Number,
		required: true,
		immutable: true,
		default: () => Date.now()
	},
	ip: {
		type: String,
		required: true,
		immutable: true
	},
	operation: {
		type: Number,
		required: true,
		immutable: true
	},
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		immutable: true,
		ref: 'User'
	},
	authorization: {
		type: String,
		immutable: true
	},
	activity: {
		type: Boolean,
		required: true,
		default: true
	},
	remark: {
		type: String,
		immutable: true
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
	return conn.model('Record', schema)
}

export default ModelFactory
