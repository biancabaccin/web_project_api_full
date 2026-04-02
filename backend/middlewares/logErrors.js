const { errorLogger } = require("./logger");

const logErrors = (err, req, res, next) => {
  errorLogger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString(),
    statusCode: err.statusCode || 500,
  });
  next(err);
};

module.exports = logErrors;
