/*jslint node: true */
'use strict';

// Define required Node packages here
var mongoose = require('mongoose');

// Automobile Model
var carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  color: {
    exterior: String,
    interior: String
  },
  mileage: Number,
  bodyStyle: String,
  engine: String,
  transmission: String,
  driveTrain: String,
  vin: String,
  stockNumber: String,
  features: Array,
  photos: Array,
  comments: String,
  dealer: Boolean,
  certified: Boolean,
  userId: String
});

// Export model 
module.exports = mongoose.model('Car', carSchema);