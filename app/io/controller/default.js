const Controller = require('egg').Controller;

class DefaultControler extends Controller {
	async ping() {
		const nsp = this.app.io.of("/");
		
		//await this.ctx.socket.emit("res", "Hi");
		nsp.emit("msg", "hello world");
	}

}

module.exports = DefaultControler;
