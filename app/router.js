
module.exports = app => {
	const {router, controller, io} = app;
	const prefix = "/api/v0/";


	const index = controller.index;
	router.get(`${prefix}test`, index.test);
	router.get(`${prefix}`, index.index);

	io.of("/").route("ping", io.controller.default.ping);
}
