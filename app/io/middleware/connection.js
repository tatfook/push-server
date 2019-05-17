
const util = require("../../core/util.js");

module.exports = app => {
	return async (ctx, next) => {
		const socket = ctx.socket;
		const store = ctx.app.store;
		const socketId = socket.id;
		const token = ctx.socket.handshake.query.token;

		const user = util.jwt_decode(token || "", app.config.self.secret);

		if (!user || !user.userId) return socket.disconnect();

		ctx.state.user = user;

		//await ctx.service.socket.online({socket, ...user});

		await next();
	}
}
