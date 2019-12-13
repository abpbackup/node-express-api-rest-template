/**
 * This basic User Model has a connection with tasks as example.
 */

/**
 * Third party dependencies
 */
const mongoose = require('mongoose');

// Generate schema object
const Schema = mongoose.Schema;

// Create the User Model schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    }
    // tasks: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Log'
    //   }
    // ]
  },
  {
    timestamps: true
  }
);

// Expose model
module.exports = mongoose.model('User', userSchema);
