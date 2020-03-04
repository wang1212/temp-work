/**
 * Predefined operations
 */
import _ from 'lodash'

export const initOperations = [
	{ name: '用户管理', type: 'MENU', code: 10000, text: 'User' },
	{ name: '查询用户', type: 'ACTION', code: 10001, text: 'GET /User' },
	{ name: '添加用户', type: 'ACTION', code: 10002, text: 'POST /User' },
	{ name: '修改用户', type: 'ACTION', code: 10003, text: 'PUT /User' },
	{ name: '删除用户', type: 'ACTION', code: 10004, text: 'DELETE /User' },
	{ name: '用户登录', type: 'ACTION', code: 10005, text: 'POST /User/signIn' }
]

//
export const operationsMap = _.keyBy(initOperations, 'text')
