const { CustomAPIError, NotFoundError, BadRequestError, UnauthenticatedError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {

    if (err instanceof CustomAPIError || err instanceof NotFoundError || err instanceof BadRequestError || err instanceof UnauthenticatedError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }

    return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: err.message });
};

module.exports = errorHandlerMiddleware;