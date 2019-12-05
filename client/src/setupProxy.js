const proxy = require('http-proxy-middleware');
module.exports = function (app) {
	app.use(
		proxy('/users',
			{
				target: 'http://localhost:3001/',
				changeOrigin: true,
			}
		));
	app.use(
		proxy('/login',
			{
				target: 'http://localhost:3001/',
				changeOrigin: true,
			}
		));
};
