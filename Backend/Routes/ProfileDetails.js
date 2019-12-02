const express = require('express');

var app = express();
app.set('view engine', 'ejs');

router = express.Router();
const { redisClient } = require('../redisClient')

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

        kafka.make_request('profileTopic', { "path": "getProfileDetails", "data": req.body.username }, async function (err, result) {
          console.log("result")
          console.log(result)

          if (err) {
            console.log(err);
            res.status(500).json({ responseMessage: 'Database not responding' });
          }
          else if (result.status === 200) {
            await redisClient.set(redisKey, JSON.stringify(result), function (error, response) {
              var status = 200;
              let responseObj = {};
              if (error) {
                console.log(error);

              } else if (response) {
                responseObj.status = 200;
                responseObj.responseMessage = 'User exists!';
                responseObj.details = result
                console.log(response)
                console.log(response.result)
                console.log("user profile set to cache in redis!!");
                redisClient.expire(redisKey, 100);
                res.status(status).json(responseObj);
              } else {
                responseObj.status = 200;
                responseObj.responseMessage = 'User does not exists!';
                res.status(status).json(responseObj);
              }

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


router.post('/updateProfile', function (req, res) {
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

router.get("/allUsers", (req, res) => {
  let redisKey = "AllUsers";
  try {
    redisClient.get(redisKey, async (err, details) => {
      console.log("inside", details)
      if (err) {
        console.log(err);
        res.status(400).json({ status: 400, message: "Error at server side!" });
      } else if (details) {
        console.log("details")
        console.log(details)
        var details = JSON.parse(details)
        console.log("userProfile cached in redis!!");
        res.status(200).json({ details });
      } else {
        kafka.make_request('profileTopic', { "path": "getAllUsers", "data": "/" }, function (err, result) {
          console.log("result")
          console.log(result)
          if (err) {
            console.log(err);
            res.status(500).json({ responseMessage: 'Database not responding' });
          }
          else if (result.status === 200) {
            redisClient.set(redisKey, JSON.stringify(result), function (error, response) {
              var status = 200;
              if (error) {
                console.log(error);

              } else {
                console.log(response)
                redisClient.expire(redisKey, 100);
                details = {}
                details.details = result;
                res.status(status).json(details);
              }
            })
          }
        })
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Error at server side!!!' });
  }
})

router.put("/follow", (req, res) => {
  console.log(req.body);
  try {
    kafka.make_request('profileTopic', { "path": "follow", "data": req.body }, function (err, result) {
      console.log("result")
      console.log(result)
      if (err) {
        console.log(err);
        res.status(500).json({ responseMessage: 'Database not responding' });
      }
      else if (result.status === 200) {
        var status = 200;
        res.status(status).json(result);
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Error at server side!!!' });
  }
})

router.put("/unfollow", (req, res) => {
  console.log(req.body);
  try {
    kafka.make_request('profileTopic', { "path": "unfollow", "data": req.body }, function (err, result) {
      console.log("result")
      console.log(result)
      if (err) {
        console.log(err);
        res.status(500).json({ responseMessage: 'Database not responding' });
      }
      else if (result.status === 200) {
        var status = 200;
        res.status(status).json(result);
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Error at server side!!!' });
  }
})

module.exports = router