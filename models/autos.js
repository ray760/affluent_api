/*jslint node: true */
'use strict';

// Define required Node packages here
var mongoose = require('mongoose');

// Automobile Model
var carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  color: {
    exterior: String,
    interior: String
  }
});

// Export model 
module.exports = mongoose.model('Car', carSchema);