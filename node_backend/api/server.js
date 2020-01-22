const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./routes/auth');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/auth/users', usersRouter);

server.get('/', (req, res) => res.status(200).send('<h2>5x5</h2>'))

module.exports = server;