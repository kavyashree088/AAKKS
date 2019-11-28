const express = require('express');

var app = express();
app.set('view engine', 'ejs');

router = express.Router();

//imports
var config = require('../Config/settings');
var kafka = require('../Kafka/client');

// Set up middleware
var jwt = require('jsonwebtoken');
var passport = require('passport');

var requireAuth = passport.authenticate('jwt', { session: false });
var crypt = require('./bcrypt.js');


router.post('/getProfileDetails', function (req, res) {
  console.log("Inside getProfileDetails post request");
  console.log("Sending Request Body:");
  console.log(req)
  console.log(req.body);
  let formatEmail = req.body.email.toLowerCase().trim();

  console.log("formatted email:" + formatEmail);

  crypt.newHash(req.body.userPassword, function (response) {
    enPassword = response;
    console.log("Encrypted password: " + enPassword);

    inputData = {
      "username": req.body.username,
      "email": formatEmail,
      "password": enPassword,
      "firstName": req.body.firstName
    }

    kafka.make_request('loginSignuptopic', { "path": "signup", "inputData": inputData, "data": req.body, "formatEmail": formatEmail }, function (err, result) {
      console.log("result")
      console.log(result)

      if (err) {
        console.log(err);
        res.status(500).json({ responseMessage: 'Database not responding' });
      }
      else if (result.status === 200) {
        console.log("User Added");
        res.status(200).json({ responseMessage: 'Successfully Added!' });
      } else {
        console.log("User already exists");
        res.status(200).json({ responseMessage: 'User Already exists!' });
      }
    });
  })
});
