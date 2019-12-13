/**
 * Core dependencies
 */
const fs = require('fs');
const path = require('path');

/**
 * Log all requests into a log file
 * @param {String} log_file - relative path from root
 */
const createLogFile = (log_file = 'access.log') => {
  // Create access file
  var accessLogStream = fs.createWriteStream(
    // From root path
    path.join(__dirname, '/../' + log_file),
    {
      flags: 'a'
    }
  );

  // Validate if the file was created
  accessLogStream.on('error', function(error) {
    // End file
    accessLogStream.end();

    // Modify default error message
    console.log(
      "The log file couldn't be created. Make sure the folder exists and check folder permissions. A default access.log file was created on the root folder"
    );

    // Create a default log file
    throw error;
  });

  return accessLogStream;
};

// Expose module
module.exports = createLogFile;
