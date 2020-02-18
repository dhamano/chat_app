const http = require('http');
const sock = require('sockjs');
const host = 'external-api.host';

let sockets = {};

const socketServer = sock.createServer();

socketServer.on('connection', function(conn) {
    sockets[conn.id] = conn;
});