const joi = require("joi");
const _ = require("lodash");
const Controller = require("egg").Controller;

const rules = {
	"int": joi.number().required(),
	"int_optional": joi.number(),
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

	get util() {
		return this.app.util;
	}

	get consts() {
		return this.app.consts;
	}

	get queryOptions() {
		return this.ctx.state.queryOptions
	}

	getParams() {
		return _.merge({}, this.ctx.request.body, this.ctx.query, this.ctx.params);
	}

	validate(schema, data, options = {allowUnknown:true}) {
		const params = data || this.getParams();

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

	getUser() {
		return this.ctx.state.user || {};
	}

	authenticated() {
		const user = this.ctx.state.user;
		const admin = this.ctx.state.admin;

		if (!user || user.userId == undefined) {
			if (!admin || admin.userId == undefined) return this.throw(401);
			return admin;
		} 

		return user;
	}

	adminAuthenticated() {
		const config = this.config.self;
		const token = this.ctx.state.token;
		const user = this.app.util.jwt_decode(token || "", config.adminSecret, true);
		if (!user) return this.throw(401);
		
		return user;
	}

	success(body = "OK", status=200) {
		this.ctx.status = status;
		this.ctx.body = body;
	}

	fail(body, status, data) {
		this.ctx.status = status || 400;
		if (_.isNumber(body)) body = Err.getByCode(body) || body;
		if (_.isObject(body)) body.data = data;
		this.ctx.body = body;
	}

	throw(...args) {
		return this.ctx.throw(...args);
	}

	formatQuery(query) {
		const self = this;
		const Op = this.app.Sequelize.Op;
		for (let key in query) {
			const arr = key.split("-");
			if (arr.length != 2) continue;

			const val = query[key];
			delete query[key];
			
			const newkey = arr[0];
			const op = arr[1];
			const oldval = query[newkey];

			if (!_.isPlainObject(oldval)) {
				query[newkey] = {};
				if (oldval) {
					query[newkey][Op["eq"]] = oldval;
				}
			}
			console.log(op, Op[op]);
			query[newkey][Op[op]] = val;
		}

		const replaceOp = function(data) {
			if (!_.isObject(data)) return ;
			_.each(data, (val, key) => {
				if (_.isString(key)) {
					const op = key.substring(1);
					if (_.startsWith(key, "$") && Op[op]) {
						data[Op[op]] = val;
						delete data[key];
					}
					if (key == "$model$" && typeof(val) == "string" && self.model[val]) {
						data["model"] = self.model[val];
						delete data["$model$"];
					}
				}
				replaceOp(val);
			});
		}

		replaceOp(query);
	}
}

module.exports = BaseController;
