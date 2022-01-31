const { StatusCodes } = require("http-status-codes");
const customApi = require("./custom-api");

class notFoundError extends customApi {
  constructor(message) {
    super(message);
    this.statuscode = StatusCodes.NOT_FOUND;
  }
}

module.exports = notFoundError;
