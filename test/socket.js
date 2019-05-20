const io = require('socket.io-client');

class Socket {
	constructor({token, socketUrl}) {
		this.socket = io(socketUrl || "http://127.0.0.1:9000", {
			query: {token},
		});

		socket.on("connect", data => {
			this.state = "connect";
		});

		socket.on("disconnect", (e) => {
			this.state = "disconnect";
		});

		socket.on("error", (e) => {
			this.state = "error";
		});
	}
}

module.exports = Socket;
