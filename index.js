const http = require('http');
const app=require('./app');

//Take env variable for port or 3000 port if is not set
const port = process.env.PORT || 3000;

const server=http.createServer(app);

server.listen(port);