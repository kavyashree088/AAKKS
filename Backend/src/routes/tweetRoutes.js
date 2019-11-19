const express = require('express');
const router = express.Router();

const {redisClient} = require('../../redisClient')

//imports
//var config = require('../../config/settings');
var kafka = require('../kafka/client');
//var jwt = require('jsonwebtoken');
//const passport = require('../../config/passport');
//var requireAuth = passport.authenticate('jwt', { session: false });

router.post('/writeATweet',  function (req, res) {
    /*console.log("Inside write a tweet");
    console.log("Requestbody is ::");
    console.log(req.body);*/
    let {userId, tweetText}  = req.body;
    let tweetDetails =  {userId, tweetText} ;

    kafka.make_request('tweetTopics',{'path':'writeATweet', 'tweetDetails' : tweetDetails}, function(err,result){
      var responseObj = {
        status : false,
        message :""
      };
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Database is not responding!!!' });
      }
      else if (result.status === 200)
      {
        console.log('tweet is added to  successfully!');
        responseObj.status = true;
        responseObj.message = result.message;
        redisClient.del("tweets_"+userId);
        res.status(200).json(responseObj);
      } else if (result.status === 401){
        console.log('tweet cannot be  added!!');
        responseObj.status = false;
        responseObj.message = 'tweet cannot be added!!';
        res.status(200).json(responseObj);
      }
    });
});

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
                redisClient.expire(redisKey, 200);
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

router.post('/likeATweet', function(err, res){
  let {userId, tweetId} = req.body;
  kafka.make_request('tweetTopics',{'path':'likeATweet', userId, tweetId}, function(err,result){
    var responseObj = {
      status : false,
      message :""
    };
    let status = 200;
    if (err) {
      console.log(err);
      status = 500;
      responseObj.message = 'Database is not responding!!!';
    }
    else if (result.status === 200)
    {
      console.log('Added like successfully!');
      responseObj.status = true;
      responseObj.message = result.message;
      res.status(200).json(responseObj);
    } else if (result.status === 401){
      console.log('Like cannot be  added to the tweet!!');
      responseObj.status = false;
      responseObj.message = result.message;
    }
    res.status(status).json(responseObj);
  });

});

router.post('/replyATweet', function(err, res){
  let {userId, tweetId, tweetReply} = req.body;
  kafka.make_request('tweetTopics',{'path':'replyATweet', userId, tweetId, tweetReply}, function(err,result){
    var responseObj = {
      status : false,
      message :""
    };
    let status = 200;
    if (err) {
      console.log(err);
      status = 500;
      responseObj.message = 'Database is not responding!!!';
    }
    else if (result.status === 200)
    {
      console.log('Added reply successfully!');
      responseObj.status = true;
      responseObj.message = result.message;
      res.status(200).json(responseObj);
    } else if (result.status === 401){
      console.log('reply cannot be  added to the tweet!!');
      responseObj.status = false;
      responseObj.message = result.message;
    }
    res.status(status).json(responseObj);
  });
});


module.exports = router;