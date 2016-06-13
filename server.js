/*jslint node: true */
'use strict';

// Define Node Packages here
var express = require('express');

// Instantiate Express App
var apiApp = express();

// Environment defined port or 3000
var port = process.env.PORT || 3000;

// Instantiate Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'No autos currenty available' });
});

// Register all our routes with /api
apiApp.use('/api', router);

// Start the server
apiApp.listen(port);
console.log('Insert automotive on port ' + port);