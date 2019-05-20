const _ = require("lodash");
const Controller = require("../core/controller.js");

class AppControler extends Controller {

	async broadcast() {
		this.adminAuthenticated();
		const data = this.validate();
		const nsp = this.app.io.of("/");
		nsp.emit("broadcast", data);
		this.success();
	}

	async msg() {
		this.adminAuthenticated();
		const {userIds=[], rooms=[], msg={}} = this.validate();

		const userRooms = userIds.map(userId => this.ctx.service.socket.getUserRoom(userId));
		const rs = _.uniq(rooms.concat(userRooms));
		for (let i = 0; i < rs.length; i++) {
			this.app.io.of("/").to(rs[i]).emit("msg", this.ctx.service.socket.getMsg({payload: msg}));
		}

		this.success();
	}

	async join() {
		this.adminAuthenticated();
	}

	async index() {
		const nsp = this.app.io.of("/");
		nsp.emit("msg", "hello world");
		return this.ctx.body = "OK";
	}

}

module.exports = AppControler;
