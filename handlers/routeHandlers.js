const { serverResponse } = require('../lib/responses');
const Services = require('../lib/request');

exports.getStockInformation = async (req, res) => {
    const [logo, news, price] = await Promise.all([
        await Services.getCompanyLogo(req.params.symbol),
        await Services.getCompanyNews(req.params.symbol),
        await Services.getCompanyPrice(req.params.symbol)
    ])

    console.log(logo)
    serverResponse(req, res, {
        statusCode: 200,
        message: 'Successful request',
        data: {
            logo: logo ? logo.url : null,
            last_news: news ? news[0] : {},
            last_stock_price: price ? price.latestPrice : null
        }
    })
}

exports.errorRouteHandler = (req, res) => {
    return serverResponse(req, res, {
        message: "Server error: Testing error route and response!",
        statusCode: 500
    })
}