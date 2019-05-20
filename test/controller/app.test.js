const { app, mock, assert  } = require('egg-mock/bootstrap');




describe("app interface", () =>{

	// socket链接测试
	it("app broadcast", async () => {
		const token = app.util.jwt_encode({userId:1}, app.config.self.adminSecret);

		await app.httpRequest().post("/api/v0/app/broadcast").set({
			"Authorization": `Bearer ${token}`,
		}).send({}).expect(200);

		await app.httpRequest().post("/api/v0/app/msg").set({
			"Authorization": `Bearer ${token}`,
		}).send({userIds:[1]}).expect(200);
	});
});
