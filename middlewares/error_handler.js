/**
 * Internal dependencies
 */
const { logger } = require('./logger');

/**
 * Global error handler
 *
 * @param {object} error
 * @param {object} req - request
 * @param {object} res - response
 * @param {object} next - express middleware
 */
const errorHandler = (error, req, res, next) => {
  // Set the error parameters
  const message = error.message;
  const statusCode = error.statusCode || 500;
  const data = error.data;

  // Write error into the error log file ONLY server errors
  if (statusCode >= 500) {
    logger.error(error);
  }

  // Return response to the consumer
  res.status(statusCode).json({
    message: message,
    data: data
  });
};

// Export handler
module.exports = errorHandler;
