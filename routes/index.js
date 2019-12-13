/**
 * Exports all the routes so that you can require just one file in app.js
 *
 * Those here are the routes to be accepted:
 *
 * POST    /users/
 * GET     /users/:id
 * GET     /users
 * DELETE  /users/:id
 * PUT     /users/:id
 */

/**
 * Require al routes of the app
 */
const userRoutes = require('./user');
const testRoutes = require('./test');

// Expose array of routes
module.exports = [userRoutes, testRoutes];
