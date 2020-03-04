/**
 * Commentary model
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
	application: {
		type: Schema.Types.ObjectId,
		immutable: true,
		ref: 'Application'
	},
	createAt: {
		type: Number,
		required: true,
		immutable: true,
		default: () => Date.now()
	},
	text: String,
	image: [String],
	video: [String]
})

/**
 * Model Factory
 *
 * @export
 * @param {*} conn - db
 * @returns {mongoose.Model}
 */
export function ModelFactory(conn) {
	return conn.model('Commentary', schema)
}

export default ModelFactory
