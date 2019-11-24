// var tweet = require('../models/TweetSchema');

// exports.tweetTopicService = function tweetTopicService(msg, callback) {
//     console.log("In Tweet Service path:", msg.path);
//     switch (msg.path) {
//         case "writeATweet":
//             writeATweet(msg, callback);
//             break;
       
//     }
// };


// let writeATweet = function(message, callback){
//     //let userId = message.userId;
//     let tweetDetails = message.tweetDetails;
//     console.log("In tweet topics : writeATweet ", message);
//     tweet.create(tweetDetails, function(err, result){
//         if(err){
//             console.log("unable to insert into database", err);
//             callback(err, "Database Error");
//        } else if(result) {
//            console.log("result is..");
//            console.log(result);
//            callback(null, { status: 200,  message:"Tweet is added successfully!!" });
//        }
//     });
// };