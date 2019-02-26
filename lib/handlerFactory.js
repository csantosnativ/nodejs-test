const Handler = (func) => ({
    _function: (req, res) => {
        /** Log file */

        /** Parse params */
        return func.apply(this, [req, res]);
    }
})

const newHandler = fun => Handler(fun)
module.exports = { newHandler }
