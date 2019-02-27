const https = require('https');
const { stock_base_url } = require('../config/config');

const _getHttp = ( url ) => {
    return new Promise((resolve, reject) => {
        https.get(url, ( resp ) => {
            let data = '';
    
            resp.on('data', (chunk) => {
                data += chunk;
            });
    
            resp.on('end', () => {
                resolve(JSON.parse(data));
            });
        })
        .on("error", err => reject(err));
    })
}

exports.getCompanyLogo = async ( name ) => {
    let url = `${stock_base_url}/stock/${name}/logo`;
    const response = await _getHttp(url);
    return { logo_url: response.url }
}

exports.getCompanyNews = async ( name ) => {
    let url = `${stock_base_url}/stock/${name}/news/latest/1`;
    const response = await _getHttp(url);
    return { latest_new: response[0] }
}

exports.getCompanyPrice = async ( name ) => {
    let url = `${stock_base_url}/stock/${name}/quote`;
    const response = await  _getHttp(url);
    return { latest_stock_price: response.latestPrice }
}