const handlerFactory = require('../lib/handlerFactory');
const { parse } = require('url');
var handlers = {};

/** Set/create new route */
exports.setRoute = (url, handler_function) => {
    /** Assign new Handler instance to a key = route path */
    handlers[url] = handlerFactory.newHandler(handler_function)
}

exports.route = (req) => {
    /** Parse url path */
    const url_path = parse(req.url, true).pathname; 
    const this_handler = handlers[url_path];
    if (!this_handler) return this.notFound(req);
    return this_handler;
}

/** When url is not found */
exports.notFound = (req) => {
    const response = {
        statusCode: 404,
        message: `URL path '${parse(req.url).pathname}' not found.`
    }
    return handlerFactory.newHandler((req, res) => {
        res.writeHead(404, { 'Content-type': 'application/json' })
        res.write(JSON.stringify(response));
        res.end();
    })
}

