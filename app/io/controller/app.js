
const _ = require("lodash");
const Controller = require("../../core/ioController.js");

class App extends Controller {
	msg() {
		const message = this.ctx.args[0] || {};
		const nsp = this.app.io.of("/");
		const client = this.ctx.socket.id;
		const {target, payload} = message;

		const msg = this.ctx.service.socket.getMsg({
			payload,
			action:"msg",
			metadata: {
				target,
				client,
			}
		});

		nsp.to(target).emit("app/msg", msg);
	}

	join() {
		const {room} = this.validate({room: "string"});
		this.ctx.socket.join(room, () => {
			this.success(this.ctx.socket.rooms);
		});
	}

	leave() {
		const {room} = this.validate({room: "string"});

		this.ctx.socket.leave(room, () => {
			this.success(this.ctx.socket.rooms);
		});
	}

	rooms() {
		this.success(this.ctx.socket.rooms);
	}
}

module.exports = App;
