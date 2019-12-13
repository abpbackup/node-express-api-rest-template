/**
 * Third party dependencies
 */
const express = require('express');
const { body } = require('express-validator');

/**
 * Internal dependencies
 */
const userController = require('../controllers/user');

// Create router object
const router = express.Router();

// GET /users/:id
router.get('/users/:id', userController.getUser);

// GET /users
router.get('/users', userController.getUsers);

// POST /users
router.post(
  '/users',
  [
    body('name')
      .trim()
      .isLength({
        min: 4
      })
  ],
  userController.createUser
);

// PUT /users
router.put(
  '/users/:id',
  [
    body('name')
      .trim()
      .isLength({
        min: 4
      })
  ],
  userController.updateUser
);

// DELETE /users
router.delete('/users/:id', userController.deleteUser);

// Expose router object
module.exports = router;
