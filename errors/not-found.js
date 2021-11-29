const CustomAPIError = require('./custom-error');
const { StatusCodes } = require('http-status-codes');

class NotFound extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFound;