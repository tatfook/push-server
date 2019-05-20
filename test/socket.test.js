
const io = require('socket.io-client');

const { app, mock, assert  } = require('egg-mock/bootstrap');

describe("socket", () =>{

	// socket链接测试
	it("socket connect", async () =>{
		const socket = await new Promise((resolve, reject) => {
			const socket = io("http://127.0.0.1:9000");
			socket.on("connect", data => {
				return resolve(socket);
			});
			socket.on("disconnect", (e) => {
				console.log("disconneect", e);
				reject(false);
			});
			socket.on("error", (e) => {
				console.log("disconneect", e);
				reject(false);
			});
		});
		assert(socket);

		// 加入room
		socket.emit("app/join", {room:"room1"}, data => {
			console.log(data);
		});

		socket.emit("app/rooms", {}, data => console.log(data));

		return new Promise((resolve, reject) =>{

		});
	});
});
