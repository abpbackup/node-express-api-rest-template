/*
 * Node JS, Express JS basic Real World API Rest Server Template
 *
 * @author   Andres Botero (Britech Group LLC)
 * @license  Public domain
 * @version  1.0.0
 * @since    11/01/2019
 */

/**
 * Core dependencies
 */

/**
 * Third Party dependencies
 */
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

/**
 * Internal dependencies
 */
const routes = require('./routes');
const config = require('./config/config');
const createLogFile = require('./services/create_log_file');
const { accessLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error_handler');
const cors = require('./middlewares/cors');

// Create global express object
const app = express();

// For production only
if (process.env.NODE_ENV === 'production') {
  // Extra headers
  app.use(helmet());

  // Assets compression
  // @important: for better performance, delegate this to the hosting provider
  app.use(compression());
}

// Log requests if enable
if (config.log) {
  // Create the log file if no exists
  const accessLogStream = createLogFile(config.access_log_file);

  // Log the request
  app.use(accessLogger(accessLogStream));
}

// Apply body parser middleware
app.use(bodyParser.json());

// Apply CORS header
app.use(cors);

// All routes
app.use(routes);

// Global error handler
app.use(errorHandler);

// Expose the Express object
module.exports = app;
