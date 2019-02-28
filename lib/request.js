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
                resolve({
                    statusCode: resp.headers.statusCode,
                    contentType: resp.headers["content-type"],
                    data
                });
            });
        })
        .on("error", err => reject(err));
    })
}

exports.getCompanyLogo = ( name ) => {
    return new Promise( async( resolve, reject ) => {
        let url = `${stock_base_url}/stock/${name}/logo`;
        try {
            const response = await _getHttp(url);
            response.contentType == "application/json; charset=utf-8" ? 
                resolve(JSON.parse(response.data)) :
                resolve(null)
        } catch (error) {
            reject(error)
        }
    })
}

exports.getCompanyNews = ( name ) => {
    return new Promise( async( resolve, reject ) => {
        let url = `${stock_base_url}/stock/${name}/news/latest/1`;
        try {
            const response = await _getHttp(url);
            response.contentType == "application/json; charset=utf-8" ? 
                resolve(JSON.parse(response.data)) :
                resolve(null)
        } catch (error) {
            reject(error)
        }
    })
}

exports.getCompanyPrice = ( name ) => {
    return new Promise( async( resolve, reject ) => {
        let url = `${stock_base_url}/stock/${name}/quote`;
        try {
            const response = await _getHttp(url);
            response.contentType == "application/json; charset=utf-8" ? 
                resolve(JSON.parse(response.data)) :
                resolve(null)
        } catch (error) {
            reject(error)
        }
    })
}