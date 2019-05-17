
exports.keys = "keepwork";

exports.cors = {
	origin: "*",
}

exports.middleware = ['authenticated'];

exports.security = {
	xframe: {
		enable: false,
	},
	csrf: {
		enable: false,
	},
}

exports.onerror = {
	all: (e, ctx) => {
		const message = e.stack || e.message || e.toString();

		ctx.status = e.status || 500;
		ctx.body = message;
		if (e.name == "SequelizeUniqueConstraintError") {
			ctx.status = 409;
		}
	}
}

// https://socket.keepwork.com/
// https://socket.keepwork.com/api/v0

exports.io = {
	redis: {
		host: "10.28.18.20",
		port: 6379,
		//password: null,
		db: 6,
	},
	namespace: {
		'/': {
			connectionMiddleware:["connection"],
			packetMiddleware:["packet"],
		},
	},
};

exports.redis = {
	client: {
		host: "10.28.18.20",
		port: 6379,
		password: null,
		db: 6,
	}
}
