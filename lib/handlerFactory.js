const Handler = (func, verb, params) => ({
    _function: (req, res) => {
        return func.apply(this, [req, res]);
    },
    _verb: verb.toUpperCase(),
    _params: params
})

const newHandler = ( fun, verb, params ) => Handler(fun, verb, params)
module.exports = { newHandler }
