/**
 * Role service
 */
import RoleModelFactory from '../models/Role'
import UserRoleModelFactory from '../models/UserRole'

/**
 * Role service
 *
 * @constructor
 * @param {*} ctx - app context
 */
function RoleService(ctx) {
	/* app context */
	this.context = ctx
	/* model */
	this.RoleModel = RoleModelFactory(ctx.db)
	this.UserRoleModel = UserRoleModelFactory(ctx.db)
}

/**
 * Get roles by user
 *
 * @param {*} user - user._id
 * @returns Role[]
 */
RoleService.prototype.getRoleByUser = async function(user) {
	const userRoles = await this.UserRoleModel.find({ user }).populate('role')
	return userRoles.map(userRole => userRole.role)
}

/**
 * Service Factory
 */
export default ctx => new RoleService(ctx)
