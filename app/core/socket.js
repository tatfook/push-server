
import io from "socket.io-client";

function initSocket() {
	//const user = jwt.decode(this.token, null, true);
	//if (!user || !user.userId) { 
		//console.log("token 无效", this.token);
		//return ;
	//}

	//if (g_app.socket) {
		//console.log("socket already exist");
		//return g_app.socket;
	//}

}

export default {
	init() {
		const socketUrl = "http://127.0.0.1:9000";
		const socket = io(socketUrl, {
			query: {
				token: "token",
				userId: "userId",
			},
			transports: ['websocket'],
		});

		socket.on("connect", () => {
			console.log("socket connect successful", socket);
		});

		socket.on("disconnect", msg => {
			console.log("socket disconnect", msg);
		});

		socket.on("error", e => {
			console.log("socket error", e);
		});

		this.socket = socket;
	}
}
