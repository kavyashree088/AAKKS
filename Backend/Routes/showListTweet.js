const express = require('express');
const router = express.Router();
var kafka = require('../kafka/client');


router.post('/showListTweet',  function (req, res) {
    console.log("Inside show list tweet");
    console.log("Req is :");
    console.log(req.body);
    
    // let {userId, tweetText}  = req.body;
    // let tweetDetails =  {userId, tweetText} ;
  
    kafka.make_request('listTopics',{"path":"showListTweet", "listDetails" : req.body}, function(err,result){
      var responseObj = {
        status : false,
        message :""
      };
      if (err) {
        console.log(err);
        res.send("Difficulty in Connectivity! Try again later!")
      }
      else 
      {
          res.send(result); 
      }
    });
});

module.exports = router;