require('dotenv').config();

const server = require('./api/server');
const socketServer = require('./api/webSocketServer');
let history = [];
let clients = [];
let usedColors = {};

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`\n*** API running on port ${port} ***\n`));

// Web Socket Server
const webSS = new socketServer({
    httpServer: server
});

webSS.on('request', function(request) {
    console.log((new Date() + ' Connection from origin ' + request.origin + '.'));
    let connection = request.accept(null, request.origin);
    let index = clients.push(connection) -1;
    let userName = false;
    let userColor = false;
});

console.log((new Date()) + ' Connection accepted');

if(history.length > 0) {
    connection.sendUTF( JSON.stringify({ type: 'history', data: history }) );
}

function getUserColor() {
    let color = '#'+Math.floor(Math.random()*16777215).toString(16);
    if (usedColors[color]) {
        color = getUserColor();
    }
    usedColor[color] = true;
    return color;
}

connection.on('message', function(message) {
    if (message.type === 'utf8') {

        if (userName === false) {
            userName = htmlEntities(message.utf8Data);
            userColor = getUserColor();
            connection.sendUTF( JSON.stringify({ type: 'color', data: userColor }) );
            console.log((new Date()) + ' Recieved Message from ' + userName + ' with ' + userColor + ' color.');

        } else {
            console.log((new Date()) + ' Received Message from ' + userName + ': ' + message.utf8Data);

            let historyObj = {
                time: (new Date().getTime()),
                text: htmlEntities(message.utf8Data),
                author: userName,
                color: userColor
            };
            history.push(historyObj);
            history = history.slice(-100);

            let json = JSON.stringify({ type: 'message', data: historyObj });
            clients.forEach( client => client.sendUTF(json) );
        }
    };
});

connection.on('close', function(connection) {
    if (userName !== false && userColor !== false) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');

        clients.splice(index, 1);
        delete usedColors[userColor];
    }
});