/**
 * Role && Operation model
 */
// eslint-disable-next-line
import mongoose, { Schema } from 'mongoose'

/* schema */
const schema = new Schema({
	operation: {
		type: Schema.Types.ObjectId,
		required: true,
		immutable: true,
		ref: 'Operation'
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
	return conn.model('RoleOperation', schema)
}

export default ModelFactory
