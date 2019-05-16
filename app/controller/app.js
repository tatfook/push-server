const Controller = require('egg').Controller;

class AppControler extends Controller {
	async broadcast() {
		this.adminAuthenticated();
		const data = this.validate();
		const nsp = this.app.io.of("/");
		nsp.emit("broadcast", data);
		this.success();
	}

	async index() {
		const nsp = this.app.io.of("/");
		nsp.emit("msg", "hello world");
		return this.ctx.body = "OK";
	}

}

module.exports = AppControler;
