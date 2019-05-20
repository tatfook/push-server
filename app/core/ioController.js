const joi = require("joi");
const _ = require("lodash");
const Controller = require("egg").Controller;

const rules = {
	"number": joi.number().required(),
	"number_optional": joi.number(),
	"string": joi.string().required(),
	"string_optional": joi.string(),
	"boolean": joi.boolean().required(),
	"boolean_optional": joi.boolean(),
}

class BaseController extends Controller {
	get model() {
		return this.app.model;
	}

	get socket() {
		return this.ctx.socket;
	}

	success(body = "OK") {
		const ack = this.ctx.args[1] || (() => {});	
		ack(body);
	}

	throw(...args) {
		return this.ctx.throw(...args);
	}

	validate(schema, data, options = {allowUnknown:true}) {
		const params = data || this.ctx.args[0] || {};

		schema = schema || {};

		_.each(schema, (val, key) => {
			schema[key] = rules[val] || val;
		});

		const result = joi.validate(params, schema, options);

		if (result.error) {
			const errmsg = result.error.details[0].message.replace(/"/g, '');
			this.ctx.throw(400, "invalid params:" + errmsg);
		}

		_.assignIn(params, result.value);

		return params;
	}

	authenticated() {
		const user = this.ctx.state.user || {};
		if (user.userId == undefined) this.ctx.throw(401);
		return user;
	}
}

module.exports = BaseController;
