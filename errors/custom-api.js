const { StatusCodes } = require("http-status-codes");

class customApi extends Error {
  constructor(message) {
    super(message);
  }
}
module.exports = customApi;
