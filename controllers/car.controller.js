/*jslint node: true */
'use strict';

// Define required Node packages here
var Car = require('../models/autos');

// Affluent Autos Users POST URL /api/cars
exports.postCars = function(req, res){
  // New instance of Car Model
  var car = new Car();

  // Set properties from Users POST here
  car.make = req.body.make; // STRING
  car.model = req.body.model; // STRING
  car.year = req.body.year; // NUMBER
  car.color = req.body.color; // OBJECT

  // Save the car information and check for errors
  car.save(function(err){
    if(err)
      res.send(err);

    res.json({
      message: 'New Automobile added to database!!!',
      data: car
    });
    
  });
};
/* END */

// Affluent Autos Users GET URL /api/cars
exports.getUserCars = function(req, res){
  // Use Car model to find all cars
  Car.find({ userId: req.user._id }, function(err, cars){
    if(err)
      res.send(err);

    res.json(cars);
  });
};
/* END */

// Affluent Autos Users GET URL /api/cars
exports.getCars = function(req, res){
  // Use Car model to find all cars
  Car.find(function(err, cars){
    if(err)
      res.send(err);

    res.json(cars);
  });
};
/* END */

// Affluent Autos Users GET Individual Car by ID URL api/cars/:car_id
//var exports = router.route('/cars/:car_id');

// URL /api/cars/:cars_carid for GET
exports.getCarById = function(req, res){
  // Use Car model to find individual car
  Car.findById(req.params.car_id, function(err, car){
    if(err)
      res.send(err);

      res.json(car);
  });
};
/* END */

// Create endpoint api/cars/:car_id for DELETE
exports.deleteCar = function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  Car.findByIdAndRemove(req.params.car_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Removed automobile from database' });
  });
};
/* END */