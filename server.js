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
const http = require('http');

/**
 * Third Party dependencies
 */
const mongoose = require('mongoose');

/**
 * Internal dependencies
 */
const app = require('./app.js');
const config = require('./config/config');
const { logger } = require('./middlewares/logger');

// Create the http server passing app (Express) as the request listener
const server = http.createServer(app);

/**
 * Database connection using Mongoose Package
 *
 * @see /config/config.js and .env files for configuration
 */
mongoose
  .connect(config.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(result => {
    // Listen to given port
    server.listen(config.app.port);

    // Log the server initiation
    logger.info(
      `Server successfully created to port ${config.app.port} and connected to the database.`
    );
  })
  .catch(err => {
    // Log the connection error
    logger.error('Failed to connect to the database. Server was not started');
  });
