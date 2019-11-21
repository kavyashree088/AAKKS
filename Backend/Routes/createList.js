const express = require('express');
const router = express.Router();

//imports
//var config = require('../../config/settings');
var kafka = require('../kafka/client');
//var jwt = require('jsonwebtoken');
//const passport = require('../../config/passport');
//var requireAuth = passport.authenticate('jwt', { session: false });

router.post('/writeATweet',  function (req, res) {
    console.log("Inside write a tweet");
    console.log("Requestbody is ::");
    console.log(req.body);
    
    let {userId, tweetText}  = req.body;
    let tweetDetails =  {userId, tweetText} ;
  
    kafka.make_request('tweetTopics',{"path":"writeATweet", "tweetDetails" : tweetDetails}, function(err,result){
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
        console.log("tweet is added to  successfully!");
        responseObj.status = true;
        responseObj.message = result.message;
        res.status(200).json(responseObj);
      } else if (result.status === 401){
        console.log("tweet cannot be  added!!");
        responseObj.status = false;
        responseObj.message = "tweet cannot be added!!";
        res.status(200).json(responseObj);
      }
    });
});

module.exports = router;