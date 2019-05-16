
module.exports = app => {
	const {router, controller, io} = app;
	const prefix = "/api/v0/";


	const index = controller.index;
	router.get(`${prefix}test`, index.test);
	router.get(`${prefix}`, index.index);

	const _app = controller.app;
	router.post(`${prefix}app/broadcast`, _app.broadcast);

	//io.of("/").route("ping", io.controller.default.ping);
}
