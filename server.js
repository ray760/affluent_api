/*jslint node: true */
'use strict';

// Define Node packages here
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    carController = require('./controllers/car.controller'),
    userController = require('./controllers/user.controller'),
    authController = require('./controllers/auth.controller');

//mongoose.connect('mongodb://localhost:27017/affluentautos');
mongoose.connect('mongodb://admin:123456@ds011715.mlab.com:11715/affluentautos');

// Instantiate Express App
var apiApp = express();

// Body-Parser initiated here
apiApp.use(bodyParser.urlencoded({
  extended: true
}));

// Environment defined port or 3000
var port = process.env.PORT || 3000;

// Use the passport package in our application
apiApp.use(passport.initialize());

// Instantiate Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'No autos currenty available' });
});

// Endpoint Handler for /cars
router.route('/userCars')
  .post(authController.isAuthenticated, carController.postCars)
  .get(authController.isAuthenticated, carController.getUserCars);

// Endpoint Handler for /cars
router.route('/cars')
  /*.post(carController.postCars)*/
  .get(carController.getCars);

// Endpoint Handler for /cars/:car_id
router.route('/cars/:car_id')
  .get(carController.getCarById)
  .delete(carController.deleteCar);

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers);

// Initiate /cars prefixed route
//var carsRoute = router.route('/cars');

// Register all our routes with /api
apiApp.use('/api', router);

// Start the server
apiApp.listen(port);
console.log('Insert automotive on port ' + port);