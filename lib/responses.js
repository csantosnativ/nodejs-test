
/**
 * Module for server responses
 */
const { printLogLine, formatDate } = require('./commonUtils');
const { parse } = require('url');

exports.serverResponse = ( req, res, res_info ) => {
    const response = {
        statusCode: res_info.statusCode,
        message: res_info.message || '',
        data: res_info.data || null
    }
    res.writeHead(res_info.statusCode, { 'Content-type': 'application/json' });
    res.write(JSON.stringify(response));
    res.end();
    printLogLine({
        status: res_info.statusCode,
        method: req.method,
        path: parse(req.url).pathname,
        result: res_info.message,
        time: formatDate(new Date())
    })
}