/**
 * response utils
 */

/**
 * response result code
 */
export const RESULT_ERROR = {
	DEFAULT: (msg = '') => ({ code: 500, message: 'Server Error. ' + msg }),
	EMPTY: (msg = '') => ({ code: 404, message: 'Not Found. ' + msg }),
	AUTHENTICATION: (msg = '') => ({ code: 401, message: 'Unauthorized. ' + msg }),
	PERMISSION_DENIED: (msg = '') => ({ code: 403, message: 'Permission Denied. ' + msg }),
	INVALID_PARAMETER: (msg = '') => ({ code: 1001, message: 'Invalid Parameter. ' + msg }),
	VERIFICATION: (msg = '') => ({ code: 1002, message: 'Verification Failed. ' + msg })
}

/**
 * response result object
 */
export function ResponseResult() {
	this.code = 200
	this.message = 'Successful'
	this.data = null
}

/**
 * Set response result error
 *
 * @param {RESULT_ERROR} error
 */
ResponseResult.prototype.setError = function(error) {
	this.code = error.code
	this.message = error.message
	this.data = null
}

/**
 * Set response result data
 *
 * @param {*} data
 */
ResponseResult.prototype.setData = function(data) {
	this.data = data
}
