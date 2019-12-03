// var Tweets= require('../models/TweetSchema')
// function handle_request(msg, callback) {
//     console.log("Inside analytics topic request");
  
//     Tweets.find({}).sort({'views':-1}).limit(10).then((result,err)=>{  //Temp will be Tweets
//         // console.log(result);
 
//         if(err)
//         console.log("error in mongo query")
//         console.log("ihwww")
//         console.log("Result:",result);
//         callback(null,result);
//      })
//   }

//   exports.handle_request = handle_request;
const express = require('express');
var app = express();
app.set('view engine', 'ejs');
router = express.Router();
var exports = module.exports = {};
var Temp=require('../models/Temp');
var Tweets = require('../models/TweetSchema');
var Users=require('../models/UserSchema');

exports.analyticsService = function analyticsService(msg, callback) {
    console.log("In Analytics Service path:", msg.path);
    switch (msg.path) {
        case 'graphBar':
            graphBar(msg, callback);
            break;
        // case 'hourlyGraph':
        //     hourlyGraph(msg, callback);
        //     break;
        case 'profileViews':
             profileViews(msg, callback);
            break;

        case 'fetchLikes':
                fetchLikes(msg, callback);
                break;
        case 'fetchRetweets':
            fetchRetweets(msg, callback);
            break;
        // case 'getFollowersTweets':
        //     getFollowersTweets(msg, callback);
        //     break;
        // case 'monthlyTweets':
        //     monthlyTweets(msg, callback);
        //     break;
        // case 'dailyTweets':
        //     dailyTweets(msg, callback);
        //     break;

    }
};

let graphBar = function(message, callback){

    console.log("Inside views request");
  
    Tweets.find({}).sort({'views':-1}).limit(10).then((result,err)=>{  //Temp will be Tweets
        // console.log(result);
 
        if(err)
        console.log("error in mongo query")
      
        //console.log("Result:",result);
        callback(null,result);
     })
};

// let hourlyGraph = function(message, callback){

//     console.log("Inside Hourly graph kafka backend request");
  
//     var current_timestamp=Date.now();
//     var current_date=new Date(current_timestamp);
//     console.log(current_timestamp);
//     console.log(current_date);
//     console.log(current_date.getDate());
//     console.log(current_date.getMonth());
//     console.log(current_date.getFullYear());
//     console.log(current_date.getHours());
//     var hours=[];

//     console.log(current_timestamp);
    
//     Tweets.find({createdAt:"2019-12-02T10:12:40.966+0000"}).then((result,err)=>{

//         console.log("hour result:",result);
//         console.log("cccc");
        
//         console.log("type of createdAt:",typeof(createdAt));
//         callback(null,result);
//     })
//     for(let i=1;i<current_date.getHours();i++){

//         Tweets.find({createdAt:"2019-12-02T10:12:40.966+0000"}).then((result,err)=>{

//             console.log("hour result:",result);
//             console.log("cccc");
            
//             console.log("type of createdAt:",typeof(createdAt));
//             callback(null,result);
//         })
//     }
    
//     // Tweets.find({}).sort({'hour':-1}).limit(10).then((result,err)=>{  //Temp will be Tweets
//     //     // console.log(result);
 
//     //     if(err)
//     //     console.log("error in mongo query")
//     //     console.log("ihwww")
//     //     console.log("Result:",result);
//     //     callback(null,result);
//     //  })
// };

let profileViews = function(message, callback){

    console.log("Inside profile Views kafka backend");

    var current_timestamp=Date.now();
    var current_date=new Date(current_timestamp);
    console.log(current_timestamp);
    console.log(current_date);
    console.log(current_date.getDate());
    console.log(current_date.getMonth());
    console.log(current_date.getFullYear());
    console.log(current_date.getHours());
  
    
    

    Tweets.find({"createdAt":new Date("2019-12-02T10:12:40.966+0000")}).then((result,err)=>{  //Temp will be Tweets
        // console.log(result);
 
        if(err)
            console.log("error in mongo query")
      
        console.log("Profile Views:",result);
        callback(null,result);
     })
};

let fetchLikes = function(message, callback){

    console.log("Inside fetch Likes request");
  
    
    Tweets.aggregate([
       {

        "$project":{
            "username":1,
            "likes":1,
            "length":{"$size":"$likes"}
        }
       },
       {
           "$sort":{"length":-1}
       },
       {
           "$limit":10
       }
    ]).then(
        result=>{
            //console.log("likes:",result);
            callback(null,result);
        }
        
    )

    
    // Tweets.find({}).sort({'views':-1}).limit(10).then((result,err)=>{  //Temp will be Tweets
    //     // console.log(result);
 
    //     if(err)
    //     console.log("error in mongo query")
      
    //     console.log("Result:",result);
    //     callback(null,result);
    //  })
};

let fetchRetweets = function(message, callback){

    console.log("Inside fetch retweets request");
  
    
    Tweets.aggregate([
       {

        "$project":{
            "username":1,
            "retweets":1,
            "length":{"$size":"$retweets"}
        }
       },
       {
           "$sort":{"length":-1}
       },
       {
           "$limit":10
       }
    ]).then(
        result=>{
           // console.log("retweets:",result);
            callback(null,result);
        }
        
    )

};