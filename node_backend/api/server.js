const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const slowDown = require('express-slow-down');
const rateLimit = require('express-rate-limit');

const userRouter = require('./routes/auth');
const wSS = require('../webSocket/wsserver');

const server = express();

process.title = 'node-chat-app';

server.set('trust proxy', 1);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // x minutes
    max: 50                   // max requests
});

const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000,  // x minutes
    delayAfter: 25,            // x requests per windowMs
    delayMs: 500               // begin adding x ms per request above 100s
});

server.use(limiter);
server.use(speedLimiter);

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/auth', userRouter);

server.get('/wss', wSS);

server.get('/', (req, res) => res.status(200).send('<h2>5x5</h2>'))



module.exports = server;