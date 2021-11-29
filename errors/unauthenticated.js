const CustomAPIError = require('./custom-error');
const { StatusCodes } = require('http-status-codes');

class Unauthenticated extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = Unauthenticated;