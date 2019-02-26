const Router = require('../router/router');
const {getStockInformation} = require('../handlers/routeHandlers');

/** Define app routes */
Router.setRoute('/stock', getStockInformation);

exports.create = (req, res) => {
    const handler = Router.route(req);
    handler._function(req, res);
}