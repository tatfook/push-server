
const _ = require("lodash");

const jwt = require("./jwt.js");

const util = {};

util.jwt_encode = function(payload, key, expire = 3600 * 24 * 2) {
	payload = payload || {};
	payload.exp = Date.now() / 1000 + expire;

	return jwt.encode(payload, key, "HS1");
}

util.jwt_decode = function(token, key, noVerify) {
	try {
		return jwt.decode(token, key, noVerify);
	} catch(e) {
		return;
	}
}

module.exports = util;
