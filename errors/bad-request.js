const CustomAPIError = require('./custom-error');
const { StatusCodes } = require('http-status-codes');

class BadRequest extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequest;