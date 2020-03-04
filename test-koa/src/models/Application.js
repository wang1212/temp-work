/**
 * Application model
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
	version: {
		type: String,
		required: true,
		immutable: true
	},
	infoIco: String,
	infoText: {
		type: String,
		required: true
	},
	infoImage: [String],
	infoVideo: [String],
	infoWWW: String,
	infoPackage: String
})

/**
 * Model Factory
 *
 * @export
 * @param {*} conn - db
 * @returns {mongoose.Model}
 */
export function ModelFactory(conn) {
	return conn.model('Application', schema)
}

export default ModelFactory
