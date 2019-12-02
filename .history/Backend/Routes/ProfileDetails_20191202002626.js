const express = require('express');

var app = express();
app.set('view engine', 'ejs');

router = express.Router();

//imports             redisClient.del("applicantProfile_" + msg.body.user_name);

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

  console.log(req.body)
  let username = req.body.username

  try {
    let redisKey = "userProfile_" + username;
  //  let redisKey = "userProfile_" + username;
  //redisClient.del(redisKey);
    console.log(redisKey)
    redisClient.get(redisKey, async function (err, details) {
      console.log(JSON.parse(details))
      //console.log(details.rows) 
      if (err) {
        console.log(err);
        res.status(400).json({ status: 400, message: "Error at server side!" });
      } else if (details) {
        console.log(details)
        var details = JSON.parse(details)
        console.log("userProfile cached in redis!!");
        res.status(200).json({ details });
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
              var status = 200;
              let responseObj = {};
              if (error) {
                console.log(error);

              } else if (response) {
                responseObj.status = 200;
                responseObj.responseMessage = 'User exists!';
                responseObj.details = response.result
                console.log(response.result)
                console.log("user profile set to cache in redis!!");
                redisClient.expire(redisKey, 100);
              } else {
                responseObj.status = 200;
                responseObj.responseMessage = 'User does not exists!';
              }
              res.status(status).json(responseObj);
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
 // redisClient.del(redisKey);
})



router.post('/updateProfile',requireAuth, function (req, res) {
  console.log(req)
  console.log("Inside updatePofile post request");
  console.log("Sending Request Body:");

  console.log(req.body)
  let username = req.body.username
  let redisKey = "userProfile_" + username;
  redisClient.del(redisKey);
  try {
    kafka.make_request('profileTopic', { "path": "updateProfile", "data": req.body }, function (err, result) {
      console.log("result")
      console.log(result)

      if (err) {
        console.log(err);
        res.status(500).json({ responseMessage: 'Database not responding' });
      }
      else if (result.status === 200) {
        res.status(500).json({ responseMessage: result });
        console.log(result)
      }
    })
  }

  catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Error at server side!!!' });
  }
})




router.get('/getLikes',requireAuth, function (req, res) {
  console.log(req)
  let username = req.body.username
  let redisKey = "userProfile_" + username;
  redisClient.del(redisKey);


  console.log("Inside getLikes post request");
  console.log(req.currentUsername)
  console.log(req)
  console.log("Sending Request Body:");

  console.log(req.body)
  //let username = req.body.currentUsername
    try {
    kafka.make_request('profileTopic', { "path": "getLikes", "data": username }, function (err, result) {
      console.log("result")
      console.log(result)

      if (err) {
        console.log(err);
        res.status(500).json({ responseMessage: 'Database not responding' });
      }
      else if (result.status === 200) {
        res.status(500).json({ responseMessage: result });
        console.log(result)
      }
    })
  }

  catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Error at server side!!!' });
  }
})

router.get('/getTweets',requireAuth, function (req, res) {
  let username = req.body.username
  let redisKey = "userProfile_" + username;
  redisClient.del(redisKey);
  console.log("Inside getTweets post request");
  console.log("Sending Request Body:");

  console.log(req.body)
 // let username = req.body.currentUsername
    try {
    kafka.make_request('profileTopic', { "path": "getTweets", "data": username }, function (err, result) {
      console.log("result")
      console.log(result)

      if (err) {
        console.log(err);
        res.status(500).json({ responseMessage: 'Database not responding' });
      }
      else if (result.status === 200) {
        res.status(500).json({ responseMessage: result });
        console.log(result)
      }
    })
  }

  catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Error at server side!!!' });
  }
})

module.exports = router