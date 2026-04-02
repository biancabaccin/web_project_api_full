const winston = require("winston");
const path = require("path");

const requestLogger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "logs", "request.log"),
    }),
  ],
});

const errorLogger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "logs", "error.log"),
    }),
  ],
});

module.exports = { requestLogger, errorLogger };
