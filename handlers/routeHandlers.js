const { serverResponse } = require('../lib/responses');

exports.getStockInformation = (req, res) => {
    serverResponse(req, res, {
        statusCode: 200,
        message: 'Successful request',
        data: {
            params: req.params
        }
    })
}

exports.errorRouteHandler = (req, res) => {
    return serverResponse(req, res, {
        message: "Server error: Testing error route and response!",
        statusCode: 500
    })
}