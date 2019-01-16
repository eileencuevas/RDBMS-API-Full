const express = require('express');
const cohortsRouter = require('./api/cohorts/cohortsRouter');
const studentsRouter = require('./api/students/studentsRouter');

const server = express();


server.use(express.json());

server.use('/api/cohorts/', cohortsRouter);
server.use('/api/students/', studentsRouter);

server.listen(5000, () => console.log('server running on 5000'));