const Router = require('../router/router');
const { getStockInformation, errorRouteHandler } = require('../handlers/routeHandlers');

/** Define app routes */
Router.setRoute('/latest-stock/:symbol', getStockInformation, 'GET');

/** Error route (test) */
Router.setRoute('/error', errorRouteHandler, 'get');

exports.create = (req, res) => {
    const handler = Router.route(req);
    handler._function(req, res);
}