/**
 * DB utils - User
 */
import connection from './index'
import UserModelFactory from '../../models/User'
import chalk from 'chalk'
import bcrypt from 'bcrypt'

let initUsers = [{ username: 'admin', password: 'admin', name: '管理员' }]

export default async function createUser() {
	try {
		const UserModel = UserModelFactory(connection)

		// clear all
		await UserModel.deleteMany()

		initUsers = initUsers.map(user => {
			user.password = bcrypt.hashSync(user.password, 10)
			return user
		})

		// insert
		await UserModel.insertMany(initUsers)

		console.log(chalk.green('Insert users successful!'))
	} catch (err) {
		console.log(chalk.red(err.message))
	}
}

createUser()
