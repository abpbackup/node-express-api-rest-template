/**
 * Adds cors header to the response object
 *
 * @param {*} req  - request
 * @param {*} res  - response
 * @param {*} next - express middleware
 */
const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, DELETE, PUT');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
};

module.exports = cors;
