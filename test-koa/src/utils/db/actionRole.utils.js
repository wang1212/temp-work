/**
 * DB utils - Role
 */
import connection from './index'
import RoleModelFactory from '../../models/Role'
import chalk from 'chalk'

const initRoles = [
	{ name: '管理员', type: 'admin' },
	{ name: '游客', type: 'viewer' }
]

export default async function createRole() {
	try {
		const RoleModel = RoleModelFactory(connection)

		// clear all
		await RoleModel.deleteMany()

		// insert
		await RoleModel.insertMany(initRoles)

		console.log(chalk.green('Insert roles successful!'))
	} catch (err) {
		console.log(chalk.red(err.message))
	}
}

createRole()
