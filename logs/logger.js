const { createLogger, transports, transport, format } = require("winston");

const combineFormat = format.combine(
  format.timestamp(),
  format.printf((info) => {
    return `${info.timestamp} - [${info.level.toUpperCase().padEnd(7)}] - ${
      info.message
    }`;
  })
);

const logger = createLogger({
  format: combineFormat,
  level: "debug",
  transports: [
    new transports.File({
      filename: "./logs/aap.log",
      level: "info",
    }),
  ],
});

module.exports = logger;
