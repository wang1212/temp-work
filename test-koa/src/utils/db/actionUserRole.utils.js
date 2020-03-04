/**
 * DB utils - UserRole
 */
import connection from './index'
import UserModelFactory from '../../models/User'
import RoleModelFactory from '../../models/Role'
import UserRoleModelFactory from '../../models/UserRole'
import chalk from 'chalk'

const initUserRoles = [[{ username: 'admin' }, { type: 'admin' }]]

export default async function createUserRole() {
	try {
		const UserModel = UserModelFactory(connection)
		const RoleModel = RoleModelFactory(connection)
		const UserRoleModel = UserRoleModelFactory(connection)

		// clear all
		await UserRoleModel.deleteMany()

		const UserRoles = await Promise.all(
			initUserRoles.map(async item => {
				const user = await UserModel.findOne(item[0])
				const role = await RoleModel.findOne(item[1])
				return { user: user._id, role: role._id }
			})
		)

		// insert
		await UserRoleModel.insertMany(UserRoles)

		console.log(chalk.green('Insert userRoles successful!'))
	} catch (err) {
		console.log(chalk.red(err.message))
	}
}

createUserRole()
