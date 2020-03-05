const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const helmet = require('helmet');
const cors = require('cors');
const slowDown = require('express-slow-down');
const rateLimit = require('express-rate-limit');

const userRouter = require('./routes/auth');

const app = express();
const router = express.Router();

process.env.UV_THREADPOOL_SIZE = 8;

// initialize http server
const server = http.createServer(app);

// initialize WebSocket server
const wss = new WebSocket.Server({ server });

process.title = 'node-chat-app';

app.set('trust proxy', 1);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // x minutes
    max: 50                   // max requests
});

const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000,  // x minutes
    delayAfter: 25,            // x requests per windowMs
    delayMs: 500               // begin adding x ms per request above 100s
});

app.use(limiter);
app.use(speedLimiter);

app.use(helmet());
app.use(express.json());
app.use(cors());

app.use('/auth', userRouter);
app.use('/', router);
// server.get('/', (req, res) => res.status(200).send('<h2>5x5</h2>'))

wss.on('connection', ( ws ) => {
    console.log('connection…');

    // on connect message
    ws.on('message', ( message ) => {
        console.log('received: %s', message);
        connectedUsers.push(message);
    });

    ws.send('message from server at: ' + new Date());
});



module.exports = app;