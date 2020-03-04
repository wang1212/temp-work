/**
 * User service
 */
import UserModelFactory from '../models/User'

/**
 * User service
 *
 * @constructor
 * @param {*} ctx - app context
 */
function UserService(ctx) {
	/* app context */
	this.context = ctx
	/* model */
	this.UserModel = UserModelFactory(ctx.db)
}

/**
 * Get users
 *
 * @param {*} [params={}] - query { username ... }
 * @returns User[]
 */
UserService.prototype.getUser = async function(params = {}) {
	const users = await this.UserModel.find(params)
	return users
}

/**
 * Service Factory
 */
export default ctx => new UserService(ctx)
