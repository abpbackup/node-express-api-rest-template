/**
 * Core dependencies
 */
const path = require('path');

/**
 * Third party dependencies
 */
const morgan = require('morgan');
const winston = require('winston');

/**
 * Internal dependencies
 */
const config = require('../config/config');

/**
 * Log all requests into a log file using MORGAN
 * @alternative packs: Winston, Bunyan, Log4js, Pino
 * @param {String} accessLogStream - log file object
 */
const accessLogger = accessLogStream => {
  // Return the morgan call as is needed by express
  return morgan('combined', {
    stream: accessLogStream
  });
};

// Modify the format to include de error stack
const enumerateErrorFormat = winston.format(info => {
  if (info.message instanceof Error) {
    info.message = Object.assign(
      {
        message: info.message.message,
        stack: info.message.stack
      },
      info.message
    );
  }

  if (info instanceof Error) {
    return Object.assign(
      {
        message: info.message,
        stack: info.stack
      },
      info
    );
  }

  return info;
});

// Customize the format of the log
// YYYY-MM-DD HH:MM:SS | level: error msg (meta) (stack)
const myFormat = winston.format.printf(
  ({ timestamp, level, message, meta, stack }) => {
    return `${timestamp} | ${level}: ${message} ${
      meta ? `(${JSON.stringify(meta)})` : ''
    } ${stack ? `(${stack})` : ''}`;
  }
);

/**
 * Log all errors using WINSTON
 * @see https://github.com/winstonjs/winston
 */
const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.File({ filename: config.error_log_file })
  ],
  format: winston.format.combine(
    enumerateErrorFormat(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.simple(),
    myFormat
  ),
  exitOnError: false
});

// If we're not in production then log to the `console` with the format:
if (process.env.NODE_ENV !== 'prod') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  );
}

// Expose module
module.exports = {
  accessLogger,
  logger
};
