var tweet = require('../models/TweetSchema');

exports.tweetTopicService = function tweetTopicService(msg, callback) {
    console.log("In Tweet Service path:", msg.path);
    switch (msg.path) {
        case 'writeATweet':
            writeATweet(msg, callback);
            break;
        case 'getUserTweets':
            getUserTweets(msg, callback);
            break;
        case 'likeATweet':
            likeATweet(msg, callback);
            break;
       
    }
};

let writeATweet = function(message, callback){
    //let userId = message.userId;
    let tweetDetails = message.tweetDetails;
    console.log("In tweet topics : writeATweet ", message);
    tweet.create(tweetDetails, function(err, result){
        if(err){
            console.log("unable to insert into database", err);
            callback(err, "Database Error");
       } else if(result) {
           console.log("result is..");
           console.log(result);
           callback(null, { status: 200,  message:"Tweet is added successfully!!" });
       }
    });
};

let getUserTweets = (message, callback) => {
    let userId = message.userId;
    tweet.find({userId}, (err, result)=>{
        if(err){
            console.log("unable to insert into database", err);
            callback(err, "Database Error");
       } else if(result) {
           console.log("result is..");
           console.log(result);
           callback(null, { status: 200,  message:result });
       } else {
        console.log("result is..");
        console.log(result);
        callback(null, { status: 200,  message:"Tweets cannot be returned!" });
       }
    });
}

let likeATweet = function(message, callback){
    //let userId = message.userId;
    let { tweetId, userId } = message;
    console.log("In tweet topics : likeATweet ", message);
    tweet.update({"_id" : tweetId}, {$push:{"likes":userId}}, (err, result) => {
        if(err) {
            console.log("unable to insert into database", err);
            callback(err, "Database Error");
        } else if(result){
           console.log("result is..");
           console.log(result);
           callback(null, { status: 200,  message:"like added successfully!" });
        } else {
           console.log("result is..");
           console.log(result);
           callback(null, { status: 200,  message:"like cannot be added!!" });
       }
    });
};
