const { serverResponse } = require('../lib/responses');
const Services = require('../lib/request');

exports.getStockInformation = async (req, res) => {
    try {
        const [logo, news, price] = await Promise.all([
            await Services.getCompanyLogo(req.params.symbol),
            await Services.getCompanyNews(req.params.symbol),
            await Services.getCompanyPrice(req.params.symbol)
        ])
    
        serverResponse(req, res, {
            statusCode: 200,
            message: 'Successful request',
            data: {
                logo: logo ? logo.url : null,
                news_url: news ? news[0].url : null,
                last_stock_price: price ? price.latestPrice : null
            }
        })
    } catch (error) {
        serverResponse(req, res, {
            statusCode: 500,
            message: `Error: ${error.message} | ${error.stack}`,
            data: {}
        })
    }
}

exports.errorRouteHandler = (req, res) => {
    return serverResponse(req, res, {
        message: "Server error: Testing error route and response!",
        statusCode: 500
    })
}