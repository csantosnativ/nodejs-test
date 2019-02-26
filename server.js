const http = require('http');
const config = require('./config/config')
const app = require('./config/app')

/** Pass router to server object */
var server = http.createServer(app.create);

server.listen(
    config.port, 
    () => console.log(`Server running at port ${config.port}`)
);