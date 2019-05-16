const Controller = require('egg').Controller;

class IndexControler extends Controller {
	async test() {
		return this.ctx.body = "OK";
	}

	async index() {
		const nsp = this.app.io.of("/");
		
		nsp.emit("msg", "hello world");
		return this.ctx.body = "OK";
	}

}

module.exports = IndexControler;
