const { statusCodes } = require("http-status-codes");

const customAPIError = require("./custom-api-error");

class notFound extends customAPIError {
  constructor(message) {
    super(message);

    this.statusCode = statusCodes.NOT_FOUND;
  }
}

module.exports = notFound;
