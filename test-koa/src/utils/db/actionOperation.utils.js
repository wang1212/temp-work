/**
 * DB utils - Operation
 */
import connection from './index'
import OperationModelFactory from '../../models/Operation'
import chalk from 'chalk'
import { initOperations } from './operationsDefined'

//
export default async function createOperation() {
	try {
		const OperationModel = OperationModelFactory(connection)

		// clear all
		await OperationModel.deleteMany()

		// insert
		await OperationModel.insertMany(initOperations)

		console.log(chalk.green('Insert operations successful!'))
	} catch (err) {
		console.log(chalk.red(err.message))
	}
}

createOperation()
