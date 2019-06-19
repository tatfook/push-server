
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
		const {room} = this.validate({});
		if (!room) return this.throw(400, "参数错误");

		this.ctx.socket.join(room, () => {
			this.success(this.ctx.socket.rooms);
		});
	}

	leave() {
		const {room} = this.validate({});
		if (!room) return this.throw(400, "参数错误");
		const rooms = _.isArray(room) ? room : [room];
		_.each(rooms, room => this.ctx.socket.leave(room, () => {}));
		return this.success();
	}

	rooms() {
		this.success(this.ctx.socket.rooms);
	}
}

module.exports = App;
