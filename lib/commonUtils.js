/**
 * Common Utils/Functions
 */

const fs = require('fs');
const config = require('../config/config');

exports.formatDate = ( date )  => {
    return `${getStr(date, 'month')}/${getStr(date, 'day')}/${getStr(date, 'year')} ${date.toTimeString().substr(0,8)}`
}

const getStr = ( date, type ) => {
    let str;
    switch (type) {
        case 'day':
            str = String(date.getDate());
            if (str.length == 1) str = `0${str}`
            break;

        case 'month':
            str = String(date.getMonth() + 1);
            if (str.length == 1) str = `0${str}`
            break;

        case 'year': 
            str = String(date.getFullYear());
            str = str.substring(2, str.length);
            break;

        default:
            str = 'No valid date';
            break;
    }
    return str;
}

exports.printLogLine = ( request ) => {
    const log = `\n${request.status}  ${request.method} ${request.path} at ${request.time}: ${request.result}`;
    fs.appendFile(config.log_file, log, function (err) {
        if (err) console.log('Error when writing new log', err);
    });
}
