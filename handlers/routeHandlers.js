exports.getStockInformation = (req, res) => {
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.write(JSON.stringify({ 
        message: 'This is home',
        statusCode: 200
    }));
    res.end();
}