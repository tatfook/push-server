
module.exports = app => {
	const {router, controller, io} = app;
	const prefix = "/api/v0/";


	const index = controller.index;
	router.get(`${prefix}test`, index.test);
	router.get(`${prefix}`, index.index);

	const _app = controller.app;
	router.post(`${prefix}app/broadcast`, _app.broadcast);

	io.of("/").route("app/msg", io.controller.app.msg);
	io.of("/").route("app/join", io.controller.app.join);
	io.of("/").route("app/leave", io.controller.app.leave);
	io.of("/").route("app/rooms", io.controller.app.rooms);
}
