const handlerFactory = require('../lib/handlerFactory');
const { parse } = require('url');
var handlers = {};
const { printLogLine, formatDate } = require('../lib/commonUtils');
const my_regex = /:\w+/g

/** Set/create new route */
exports.setRoute = (url, handler_function, verb) => {
    /** Assign new Handler instance to a key = route path */
    const pattern_url = url.replace(my_regex, "##");
    let params = url.match(my_regex);
    
    if (params) {
        let url_split = url.split('/').filter(u => u);
        params = params.map(param => {
            const index = url_split.findIndex(u => u === param);
            return { key: param.replace(":", ""), index }
        });
    }
    else params = []
    handlers[pattern_url] = handlerFactory.newHandler(handler_function, verb, params)
}

exports.route = (req) => {
    /** Parse url path */
    const url_path = parse(req.url, true).pathname; 
    const url_splitted = url_path.split('/').filter(u => u);
    const obj_params = {};

    let this_handler = handlers[url_path];

    if (!this_handler) {
        // Compate registered url patterns with request url
        const matches = Object.keys(handlers).filter(key => {
            // Split registered url 
            const k_splitted = key.split('/').filter(k => k);
            const same_length = k_splitted.length == url_splitted.length;
            if (same_length) {
                for (let i = 0; i<k_splitted.length; i++) {
                    if (k_splitted[i] !== "##" && k_splitted[i] !== url_splitted[i])
                        return false;
                }
                return true;
            } else {    
                return false;
            }
        });
        if (matches.length) {
            const final_match = matches[0];
            this_handler = handlers[final_match];
            this_handler._params.forEach(_param => {
                obj_params[_param.key] = url_splitted[_param.index];
            })

        } else {
            return this.notFound(req);
        }
    }
    req.params = obj_params;
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
        printLogLine({
            status: 404,
            method: req.method,
            path: parse(req.url).pathname,
            result: "URL not found",
            time: formatDate(new Date())
        })
    }, '', [])
}

