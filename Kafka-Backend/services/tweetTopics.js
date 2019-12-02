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
        case 'getFollowersTweets':
            getFollowersTweets(msg, callback);
            break;
        case 'getTweetesWithHashTags':
            getTweetesWithHashTags(msg, callback);
            break;
    }
    console.log("exit of tweet Topic")
};

let writeATweet = function (message, callback) {
    //let userId = message.userId;
    let tweetDetails = message.tweetDetails;
    console.log("In tweet topics : writeATweet ", message);
    tweet.create(tweetDetails, function (err, result) {
        if (err) {
            console.log("unable to insert into database", err);
            callback(err, "Database Error");
        } else if (result) {
            console.log("result is..");
            console.log(result);
            callback(null, { status: 200, message: "Tweet is added successfully!!" });
        }
    });
};

let getUserTweets = (message, callback) => {
    let userId = message.userId;
    tweet.find({ userId }, (err, result) => {
        if (err) {
            console.log("unable to find in database", err);
            callback(err, "Database Error");
        } else if (result) {
            console.log("result is..");
            console.log(result);
            callback(null, { status: 200, message: result });
        } else {
            console.log("result is..");
            console.log(result);
            callback(null, { status: 200, message: "Tweets cannot be returned!" });
        }
    });
}

let likeATweet = function (message, callback) {
    //let userId = message.userId;
    let { tweetId, userId } = message;
    console.log("In tweet topics : likeATweet ", message);
    tweet.update({ "_id": tweetId }, { $push: { "likes": userId } }, (err, result) => {
        if (err) {
            console.log("unable to insert into database", err);
            callback(err, "Database Error");
        } else if (result) {
            console.log("result is..");
            console.log(result);
            callback(null, { status: 200, message: "like added successfully!" });
        } else {
            console.log("result is..");
            console.log(result);
            callback(null, { status: 200, message: "like cannot be added!!" });
        }
    });
};

let getFollowersTweets = (message, callback) => {
    let followersList = message.followersList;
    console.log(followersList);
    tweet.find({ userId: { $in: followersList } }, (err, result) => {
        if (err) {
            console.log("unable to insert into database", err);
            callback(err, "Database Error");
        } else if (result) {
            console.log("tweets returned!!");
            console.log(result);
            callback(null, { status: 200, message: result });
        } else {
            callback(null, { status: 200, message: "tweets list cannot be returned!!" });
        }
    });
};

async function getTweetesWithHashTags(msg, callback) {
    console.log(msg);
    tweet.find({ hashTags: msg.body.hashtag }, (err, result) => {
        if (err) {
            callback(err, "Database Error");
        } else if (result) {
            console.log(result);
            callback(null, { status: 200, message: result });
        } else {
            callback(null, { status: 200, message: "tweets list cannot be returned!!" });
        }
    })
}