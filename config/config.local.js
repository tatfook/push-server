
exports.self = {
	env: "local",
	tokenExpire: 3600 * 24 * 365,
	env:"development", // "production", "release", "development"
	secret: "WNqN9ruNgCbCmbyXNAoxpMFRTivvvKkYdivtKguxwKbYe4dN",
	adminSecret: "secret",
	//secret: "V1ZSS1YySkhUa2xhU0ZwcVlsaE5iRTB3VVNVelJBJTNEJTNE",
	apiUrlPrefix: "/api/v0/",
}

exports.cluster = {
	listen: {
		port: 9000,
		hostname: "0.0.0.0",
	}
}

exports.logger = {
	level: "DEBUG",
}

