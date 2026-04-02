const { requestLogger } = require("./logger");

const logRequests = (req, res, next) => {
  requestLogger.info({
    method: req.method,
    url: req.url,
    ip: req.ip,
    timestamp: new Date().toISOString(),
    userAgent: req.get("User-Agent"),
  });
  next();
};

module.exports = logRequests;
