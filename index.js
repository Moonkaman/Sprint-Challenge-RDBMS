const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const projectsRouter = require('./projects/projectsRouter');
const actionsRouter = require('./actions/actionsRouter');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

const port = process.env.PORT || 8000;

server.listen(port, _ => console.log(`\nServer running on port ${port}\n`))