const { StatusCodes } = require("http-status-codes");
const customApi = require("./custom-api");

class unauthenticateError extends customApi {
  constructor(message) {
    super(message);
    this.statuscode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = unauthenticateError;
