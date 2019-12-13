/**
 * This Controller sample manages a Test model CRUD requests to confirm routing
 */

/**
 * Third Party dependencies
 */

/**
 * Internal dependencies
 */

const config = require('../config/config');

/**
 * Gets one test by the id
 * GET: /tests/:id
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Express next function
 */

const getTest = async (req, res, next) => {
  // Return confirmation
  res.status(200).json({ message: 'getTest: getting one by id working' });
};

/**
 * Gets all tests
 * GET: /tests
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Express next function
 */

const getTests = async (req, res, next) => {
  // Return confirmation
  res.status(200).json({ message: 'getTests: getting all working' });
};

/**
 * Creates a new test and inserts it into the db
 * POST: /tests
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Express next function
 */

const createTest = async (req, res, next) => {
  // Return confirmation
  res.status(200).json({ message: 'createTest: creating one working' });
};

/**
 * Updates a test in the db
 * PUT: /tests
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Express next function
 */

const updateTest = async (req, res, next) => {
  // Return confirmation
  res.status(200).json({ message: 'updateTest: updating by id working' });
};

/**
 * Deletes a test
 * DELETE: /tests
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Express next function
 */

const deleteTest = async (req, res, next) => {
  // Return confirmation
  res.status(200).json({ message: 'deleteTest: deleting by id working' });
};

// Expose modules
module.exports = {
  getTest,
  getTests,
  createTest,
  updateTest,
  deleteTest
};
