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

router.post('/getProfileDetails', requireAuth, function (req, res) {
  console.log("Inside getProfileDetails post request");
  console.log("Sending Request Body:");

  console.log(req.body)
  let username = req.body.username

  try {
    let redisKey = "userProfile_" + username;
    redisClient.get(redisKey, async function (err, res) {
      if (err) {
        console.log(err);
        res.status(400).json({ status: 400, message: "Error at server side!" });
      } else if (res) {
        console.log("userProfile cached in redis!!");
        res.status(200).json({ message: res });
      } else {
        console.log("userProfile not cached in redis!!");

        kafka.make_request('profileTopic', { "path": "getProfileDetails", "data": req.body.username }, function (err, result) {
          console.log("result")
          console.log(result)

          if (err) {
            console.log(err);
            res.status(500).json({ responseMessage: 'Database not responding' });
          }
          else if (result.status === 200) {
            redisClient.set(redisKey, JSON.stringify(result), function (error, response) {
              if (error) {
                console.log(error);
                status = 400;
              } else if (response) {
                response.status = 200;
                response.details = result;
                console.log(response.details)
                console.log("user profile set to cache in redis!!");
                redisClient.expire(redisKey, 100);
              } else {
                responseObj.status = 200;
                responseObj.responseMessage = 'User does not exists!';
              }
              res.status(status).json(response);
            });
          }

          });
        }
      })
    }
    catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Error at server side!!!' });
    }
  })

        module.exports = router