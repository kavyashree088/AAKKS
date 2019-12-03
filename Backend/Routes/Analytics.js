var express = require("express");
var app = express();
app.set('view engine', 'ejs');
router = express.Router();
var config = require('../Config/settings');
var kafka = require('../Kafka/client');
// var app = express();
// var bodyParser = require("body-parser");
// var session = require("express-session");
var mongoose = require("mongoose");
// var cors = require('cors');
//import Temp from './Models/Temp';
//const Temp=require('./Models/Temp');
// var Tweets=require('../../Kafka-Backend/models/TweetSchema');
var views=[];
var id=[];

router.get('/fetchviews',function(req,res){
    
    
    console.log("in fetch views backend")
    console.log(req.body);
  
    kafka.make_request("analytics", { "path": "graphBar" }, function(
      err,
      results
    ) {
      console.log("results:",results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "System Error, Try Again."
        });
      } else {
        console.log("Inside else");
        res.json({
          graphData: results
        });
  
        res.end();
      }
    });
       
});

router.get('/hourlytweets',function(req,res){
    
    
    console.log("in hourly tweets backend")
    console.log(req.body);
  
    kafka.make_request("analytics", { "path": "hourlyGraph" }, function(
      err,
      results
    ) {
      console.log("results:",results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "System Error, Try Again."
        });
      } else {
        console.log("Inside else");
        res.json({
          graphData: results
        });
  
        res.end();
      }
    });
       
});

router.get('/fetchProfileViews',function(req,res){
    
    
    console.log("infetch Profile views  backend")
    console.log(req.body);
  
    kafka.make_request("analytics", { "path": "profileViews" }, function(
      err,
      results
    ) {
      console.log("results:",results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "System Error, Try Again."
        });
      } else {
        console.log("Inside else");
        res.json({
          graphData: results
        });
  
        res.end();
      }
    });
       
});

router.get('/fetchLikes',function(req,res){
    
    
    console.log("infetch fetchLikes backend")
  
  
    kafka.make_request("analytics", { "path": "fetchLikes" }, function(
      err,
      results
    ) {
      console.log("results:",results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "System Error, Try Again."
        });
      } else {
        console.log("Inside else");
        res.json({
          graphData: results
        });
  
        res.end();
      }
    });
       
});

router.get('/fetchRetweets',function(req,res){
    
    
  console.log("infetch fetchRetweets backend")
  

  kafka.make_request("analytics", { "path": "fetchRetweets" }, function(
    err,
    results
  ) {
    console.log("results:",results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({
        graphData: results
      });

      res.end();
    }
  });
     
});

router.get('/dailyTweets',function(req,res){
    
    
  console.log("in fetch daily  tweets backend---------------------------")
  

  kafka.make_request("analytics", { "path": "dailyTweets" }, function(
    err,
    results
  ) {
    console.log("results:",results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({
        graphData: results
      });

      res.end();
    }
  });
     
});

router.get('/monthlyTweets',function(req,res){
    
    
  console.log("infetch monthlyTweets backend")
  

  kafka.make_request("analytics", { "path": "monthlyTweets" }, function(
    err,
    results
  ) {
    console.log("results:",results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({
        graphData: results
      });

      res.end();
    }
  });
     
});

module.exports=router;