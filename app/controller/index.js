const Controller = require('egg').Controller;

class IndexControler extends Controller {
	async test() {
		return this.ctx.body = "OK";
	}

	async index() {
		const nsp = this.app.io.of("/");
		
		//await this.ctx.socket.emit("res", "Hi");
		nsp.emit("msg", "hello world");
	}

}

module.exports = IndexControler;
