const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statuscode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Somethingh went wrong try again later",
  };
  if (err.code && err.code == 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )}`;
    customError.statusCode = 400;
  }
  if (err.name == "CastError") {
    customError.msg = `No item found with id:${err.value}`;
    customError.statusCode = 404;
  }
  //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statuscode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
