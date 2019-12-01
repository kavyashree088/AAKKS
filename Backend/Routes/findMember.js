const express = require('express');
const router = express.Router();
var kafka = require('../kafka/client');


router.post('/findMember',  function (req, res) {
    console.log("Inside find Member");
    console.log("Req is :");
    console.log(req.body);

    kafka.make_request('listTopics',{"path":"findMember", "listDetails" : req.body}, function(err,result){
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