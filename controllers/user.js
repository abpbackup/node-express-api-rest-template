/**
 * This Controller sample manages an User model CRUD requests
 */

/**
 * Third Party dependencies
 */

const { validationResult } = require('express-validator');
const axios = require('axios');

/**
 * Internal dependencies
 */

const config = require('../config/config');
const User = require('../models/user');

/**
 * Gets one user by the id
 * GET: /users/:id
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Express next function
 */

const getUser = async (req, res, next) => {
  // Get id as parameter
  let id = req.params.id;

  // Get all users from db
  try {
    const user = await User.findById(id).populate('userId', 'name -_id');

    // Return user
    res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

/**
 * Gets all users
 * GET: /users
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Express next function
 */

const getUsers = async (req, res, next) => {
  // Get all users from db
  try {
    const users = await User.find()
      .limit(Number(config.db.query_limit))
      .sort({ createdAt: 'desc' })
      .populate('userId', 'name -_id');

    // Return users
    res.status(200).json({
      users: users
    });
  } catch (err) {
    return next(err);
  }
};

/**
 * Creates a new user and inserts it into the db
 * POST: /users
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Express next function
 */

const createUser = async (req, res, next) => {
  // Error validation and handling
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // To be processed by global error middleware
    const error = new Error('Validation failed, input data is incorrect.');
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  // Create model object based on body data
  const user = new User({
    name: req.body.name
  });

  try {
    // Count the users with the same name
    const users = await User.find({ name: req.body.name });

    // Validate if user with the name already exists
    if (users.length > 0) {
      // To be processed by global error middleware
      const error = new Error('Validation failed, the name is already taken.');
      error.statusCode = 422;
      error.data = errors.array();
      return next(error);
    }

    // Save the data into the database
    await user.save();

    // Return confirmation to consumer
    res.status(201).json(user);
  } catch (err) {
    // To be processed by global error handler
    next(err);
  }
};

/**
 * Updates a user in the db
 * PUT: /users
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Express next function
 */

const updateUser = async (req, res, next) => {
  // Error validation and handling
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // To be processed by global error middleware
    const error = new Error('Validation failed, input data is incorrect.');
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  try {
    // Count the users with the same name
    const users = await User.find({
      name: req.body.name,
      _id: { $not: { $eq: req.params.id } }
    });

    // Validate if user with the name already exists
    if (users.length > 0) {
      // To be processed by global error middleware
      const error = new Error('Validation failed, the name is already taken.');
      error.statusCode = 422;
      error.data = errors.array();
      return next(error);
    }

    // Get the user from the db
    let user = await User.findById(req.params.id);

    // Update the object
    user.name = req.body.name;

    // Save the data into the database
    await user.save();

    // Return confirmation to consumer
    res.status(202).json(user);
  } catch (err) {
    // To be processed by global error handler
    next(err);
  }
};

/**
 * Deletes a user
 * DELETE: /users
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Express next function
 */

const deleteUser = async (req, res, next) => {
  // Get the user from db
  try {
    const result = await User.findByIdAndDelete(req.params.id);

    // Validate response
    if (result) {
      // If you have a Micro Services architecture, you can connect to other services using a HTTP REQUEST or the mechanism you prefer.
      // Here we want to delete all entries related to the user
      await axios.post('http://serviceIp:port/route/' + req.params.id);

      // Return response
      res.status(200).json({
        message: 'The user was deleted successfully from the database'
      });
    } else {
      // To be processed by global error middleware
      const error = new Error('The id does not exist.');
      error.statusCode = 422;
      return next(error);
    }
  } catch (err) {
    return next(err);
  }
};

// Expose modules
module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
