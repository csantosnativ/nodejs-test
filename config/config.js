const { join } = require('path')
module.exports = {
    port: 5000,
    log_file: join(__dirname, "../log/log.txt"),
    stock_base_url: "https://api.iextrading.com/1.0"
}