const { StatusCodes } = require("http-status-codes");
const customApi = require("./custom-api");

class badRequestError extends customApi {
  constructor(message) {
    super(message);
    this.statuscode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = badRequestError;
