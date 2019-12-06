#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('../app');
const debug = require('debug')('fingerprintjs2page:server');
const http = require('http');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
const io = require('socket.io')(server);
const Messages = require('../models/Messages');
const UserActivity = require('../models/UserActivity');

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	const addr = server.address();
	const bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	debug('Listening on port' + bind);
}

let users = {};

io.sockets.on('connection', async (client) => {
	client.on('addUser', async (user) => {
		if (user.id !== null) {
			users[client.id] = user;
			broadcast('updateUsers', users);
			let activity = await UserActivity.findOneAndUpdate({user: user.id}, {"$push": {time: new Date()}});
			if (!activity) {
				await UserActivity.create({user: user.id, time: [new Date()]})
			}
		}
	});
	client.on('message', async (msgObj) => {
		users[client.id].name = msgObj.user.name;
		broadcast('updateUsers', users);
		broadcast('message', msgObj);
		await Messages.create({
			user: msgObj.user.id,
			userName: msgObj.user.name,
			msg: msgObj.message
		});
	});
	client.on('getchathistory', async () => {
		let messages = await Messages.find();
		broadcast('chathistory', messages);
	});
	client.on('disconnect', () => {
		delete users[client.id];
		broadcast('updateUsers', users);
	});

	function broadcast(event, data) {
		client.emit(event, data);
		client.broadcast.emit(event, data);
	}
});

