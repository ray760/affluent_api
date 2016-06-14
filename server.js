/*jslint node: true */
'use strict';

// Define Node packages here
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Car = require('./models/autos');

mongoose.connect('mongodb://localhost:27017/affluentautos');

// Instantiate Express App
var apiApp = express();

// Body-Parser initiated here
apiApp.use(bodyParser.urlencoded({
  extended: true
}));

// Environment defined port or 3000
var port = process.env.PORT || 3000;

// Instantiate Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'No autos currenty available' });
});

// Initiate /cars prefixed route
var carsRoute = router.route('/cars');

// Affluent Autos Users POST URL /api/cars
carsRoute.post(function(req, res){
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
});

// Affluent Autos Users GET URL /api/cars
carsRoute.get(function(req, res){
  // Use Car model to find all cars
  Car.find(function(err, cars){
    if(err)
      res.send(err);

    res.json(cars);
  });
});

// Affluent Autos Users GET Individual Car by ID URL api/cars/:car_id
var carRoute = router.route('/cars/:car_id');

// URL /api/cars/:cars_carid for GET
carRoute.get(function(req, res){
  // Use Car model to find individual car
  Car.findById(req.params.car_id, function(err, car){
    if(err)
      res.send(err);

      res.json(car);
  });
});

// Create endpoint api/cars/:car_id for DELETE
carRoute.delete(function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  Car.findByIdAndRemove(req.params.car_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Removed automobile from database' });
  });
});

// Register all our routes with /api
apiApp.use('/api', router);

// Start the server
apiApp.listen(port);
console.log('Insert automotive on port ' + port);