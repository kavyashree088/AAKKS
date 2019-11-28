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




router.post('/getUserTweets', function(req, res){
  let {userId} = req.body;
  console.log("in getUserTweets");
  console.log(req.body);
  try {
    let redisKey = "tweets_" + userId;
    redisClient.get(redisKey, async function(err, tweets) {
      if(err){
        console.log(err);
        res.status(400).json({status:400, message : "Error at server side!"});
      } else if(tweets){
        console.log("tweets cached in redis!!");
        res.status(200).json({message: tweets});
      } else {
        console.log("tweets not cached in redis!!");
        kafka.make_request('tweetTopics',{'path':'getUserTweets', userId}, function(err,result){
          var responseObj = {
            status : false,
            message :""
          };
          let status = 200;
          if (err) {
            console.log(err);
            res.status(500).json({ message: 'Database is not responding!!!' });
          }
          else if (result.status === 200)
          {
            //console.log('tweets returned!');
            redisClient.set(redisKey, JSON.stringify(result), function(error, response){
              if(error){
                console.log(error);
                status = 400;
              } else if(response){
                responseObj.status = true;
                responseObj.message = result.message;
                console.log("tweets set to cache in redis!!");
                redisClient.expire(redisKey, 100);
              } else{
                responseObj.status = false;
                responseObj.message = result.message;
              }
              res.status(status).json(responseObj);
            });
          } else if (result.status === 401){
            console.log('tweets cannot be returned!');
            responseObj.status = false;
            responseObj.message = 'tweet cannot be added!!';
            res.status(200).json(responseObj);
          }
        });

      }
    });
  } catch(e){
    console.log(e);
    res.status(500).json({ message: 'Error at server side!!!' });
  }
});



router.post('/getProfileDetails', requireAuth, function (req, res) {
  console.log("Inside getProfileDetails post request");
  console.log("Sending Request Body:");
  
  console.log(req.body)
  let username = req.body.username

  try{
    let redisKey = "userProfile_" + username;
  }
    kafka.make_request('profileTopic', { "path": "getProfileDetails", "data": req.body.username }, function (err, result) {
      console.log("result")
      console.log(result)

      if (err) {
        console.log(err);
        res.status(500).json({ responseMessage: 'Database not responding' });
      }
      else if (result.status === 200) {
        console.log("User exists");
        res.status(200).json({ details: result });
      } else {
        console.log("User does not exists");
        res.status(200).json({ responseMessage: 'User does not exists!' });
      }
    });

});


module.exports = router