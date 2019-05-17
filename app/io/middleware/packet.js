
const _ = require("lodash");

module.exports = app => {
	return async (ctx, next) => {
		await next();
	}
}
