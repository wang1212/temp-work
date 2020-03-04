/**
 * Authorization service
 */
import UserModelFactory from '../models/User'
import RecordModelFactory from '../models/Record'
import { RESULT_ERROR, ResponseResult } from '../utils/response'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET, EXPIRATION } from '../utils/auth'
import { operationsMap } from '../utils/db/operationsDefined'

/**
 * Auth Service
 *
 * @constructor
 * @param {*} ctx - app context
 */
function AuthService(ctx) {
	/* app context */
	this.context = ctx
	/* models */
	this.UserModel = UserModelFactory(ctx.db)
	this.RecordModel = RecordModelFactory(ctx.db)
}

/**
 * Save signIn user token
 * !private
 *
 * @param {*} authToken
 */
AuthService.prototype._saveToken = async function(authToken) {
	return this.RecordModel.create(authToken)
}

/**
 * Get token
 *
 * @param {*} [params={}]
 * @returns Record[]
 */
AuthService.prototype.getToken = async function(params = {}) {
	return this.RecordModel.find(params)
}

/**
 * Sign in app
 *
 * @returns
 */
AuthService.prototype.signIn = async function() {
	//
	const ctx = this.context
	const params = ctx.body || ctx.query
	const { username, password } = params
	//
	const result = new ResponseResult()

	if (!username || !password) {
		result.setError(RESULT_ERROR.INVALID_PARAMETER('"username" and "password" required.'))
	} else {
		const user = await this.UserModel.findOne({ username })

		if (!user) {
			result.setError(RESULT_ERROR.EMPTY(`User "${username}" does not exist.`))
		} else {
			// 验证密码
			const check = await bcrypt.compare(password, user.password)

			if (check) {
				try {
					// 生成 token，有效期
					const token = await jwt.sign({ _id: user._id, username: user.username }, SECRET, { expiresIn: EXPIRATION })
					const authorization = 'Bearer ' + token

					result.setData({
						me: user,
						authorization
					})

					// 保存 token 到数据库
					await this._saveToken({
						ip: ctx.ip,
						operation: operationsMap['POST /User/signIn'].code,
						user: user._id,
						authorization
					})
				} catch (error) {
					result.setError(RESULT_ERROR.DEFAULT(error.message))
				}
			} else {
				result.setError(RESULT_ERROR.VERIFICATION('Incorrect user password.'))
			}
		}
	}

	// response
	ctx.body = JSON.stringify(result)
}

/**
 * Service Factory
 */
export default ctx => new AuthService(ctx)
