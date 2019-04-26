
exports.keys = "keepwork";

exports.cors = {
	origin: "*",
}

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

exports.io = {
	//redis: {
		//host:"10.28.18.4",
		//port:6379,
		//db:2,
	//},
	namespace: {
		'/': {
			//connectionMiddleware:["connection", "authenticated"],
			connectionMiddleware:["connection"],
			packetMiddleware:["packet"],
		},
	},
};
