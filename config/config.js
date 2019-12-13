/**
 * Manages the app configuration based on the .env file variables and the current NODE_ENV
 */

require('dotenv').config();

// Current environment
const env = process.env.NODE_ENV;

// For development
const development = {
  app: {
    port: process.env.DEV_PORT
  },
  db: {
    url: process.env.DEV_DB_URL,
    port: process.env.DEV_DB_PORT,
    name: process.env.DEV_DB_NAME,
    query_limit: process.env.DEV_QUERY_LIMIT
  },
  admin_mail: 'your-dev-email@gmail.com',
  log: true,
  access_log_file: process.env.DEV_ACCESS_LOG_PATH,
  error_log_file: process.env.DEV_ERROR_LOG_PATH
};

// For testing
const test = {
  app: {
    port: process.env.TEST_PORT
  },
  db: {
    url: process.env.TEST_DB_URL,
    port: process.env.TEST_DB_PORT,
    name: process.env.TEST_DB_NAME,
    query_limit: process.env.TEST_QUERY_LIMIT
  },
  admin_mail: 'your-test-email@gmail.com',
  log: true,
  access_log_file: process.env.TEST_ACCESS_LOG_PATH,
  error_log_file: process.env.TEST_ERROR_LOG_PATH
};

// For production
const production = {
  app: {
    port: process.env.PROD_PORT
  },
  db: {
    url: process.env.PROD_DB_URL,
    port: process.env.PROD_DB_PORT,
    name: process.env.PROD_DB_NAME,
    query_limit: process.env.PROD_QUERY_LIMIT
  },
  admin_mail: 'your-prod-email@gmail.com',
  log: true,
  access_log_file: process.env.PROD_ACCESS_LOG_PATH,
  error_log_file: process.env.PROD_ERROR_LOG_PATH
};

// All environments object
const config = {
  development,
  test,
  production
};

// Expose the current config
module.exports = config[env];
