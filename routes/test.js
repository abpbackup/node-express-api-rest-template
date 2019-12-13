/**
 * Third party dependencies
 */
const express = require('express');

/**
 * Internal dependencies
 */
const testController = require('../controllers/test');

// Create router object
const router = express.Router();

// GET /tests/:id
router.get('/tests/:id', testController.getTest);

// GET /tests
router.get('/tests', testController.getTests);

// POST /tests
router.post('/tests', testController.createTest);

// PUT /tests
router.put('/tests/:id', testController.updateTest);

// DELETE /tests
router.delete('/tests/:id', testController.deleteTest);

// Expose router object
module.exports = router;
