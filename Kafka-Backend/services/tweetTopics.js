var tweet = require('../models/TweetSchema');
var user = require('../models/UserSchema');

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
        case 'unlikeATweet':
            unlikeATweet(msg, callback);
            break;
        case 'getDashboardTweets':
            getDashboardTweets(msg, callback);
            break;
        case 'bookmarkATweet':
            bookmarkATweet(msg, callback);
            break;
        case 'unbookmarkATweet':
            unbookmarkATweet(msg, callback);
            break;
        case 'deleteATweet':
            deleteATweet(msg, callback);
            break;
        case 'replyATweet':
            replyATweet(msg, callback);
            break;
        case 'retweetWithoutComment':
            retweetWithoutComment(msg, callback);
            break;
        case 'retweetWithComment':
            retweetWithComment(msg, callback);
            break;
    }
};

let writeATweet = async(message, callback) => {
    //let userId = message.userId;
    let tweetDetails = message.tweetDetails;
    console.log("In tweet topics : writeATweet ", message);
    let tweetText = tweetDetails.tweetText;
    if(tweetText){
        let hashTags = tweetText.toLowerCase().match(/#\w*/g);
        tweetDetails.hashTags = hashTags;
    }
    let {username} = tweetDetails;
    let profilePic= '';
    await user.findOne({username}, (err, result) => {
        if(!err && result){
            profilePic = result.profilePicture;
        }
    });
    tweetDetails.profilePic = profilePic;
    await tweet.create(tweetDetails, function(err, result){
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

let replyATweet = (message, callback) => {
    let {userId, tweetId, replyText} = message;
    tweet.update({_id: tweetId}, {$push : {'replies' : {userId, replyText}}}, (err, result) => {
        if(err) {
            console.log("unable to insert into database", err);
            callback(err, "Database Error");
        } else if(result){
           console.log("result is..");
           console.log(result);
           callback(null, { status: 200,  message:"reply is added successfully!" });
        } else {
           console.log("result is..");
           console.log(result);
           callback(null, { status: 200,  message:"reply cannot be added!!" });
        }
    });
}

let getUserTweets = (message, callback) => {
    let userId = message.userId;
    tweet.find({userId}, (err, result)=>{
        if(err){
            console.log("unable to find in database", err);
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

let unlikeATweet = function(message, callback){
    //remove userId from likes
    let { tweetId, userId } = message;
    console.log("In tweet topics : unlikeATweet ", message);
    tweet.update({"_id" : tweetId}, {$pull:{"likes":userId}}, (err, result) => {
        if(err) {
            console.log("unable to insert into database", err);
            callback(err, "Database Error");
        } else if(result){
           console.log("result is..");
           console.log(result);
           callback(null, { status: 200,  message:"like removed successfully!" });
        } else {
           console.log("result is..");
           console.log(result);
           callback(null, { status: 200,  message:"like cannot be removed!!" });
       }
    });
};

let processTweets = async (tweets) => {
    for(let i=0; i<tweets.length; i++){
        let currTweet = tweets[i];
        let { actualTweetId, isRetweet } = currTweet;
        if(isRetweet === 'true'){
            await tweet.findOne({'_id' : actualTweetId}, (err, result) => {
                console.log("in tweet find....");
                if(result){
                    console.log("in if..");
                    console.log(result);
                    tweets[i]["actualTweetDetails"] = result;
                    console.log("tweetsnow");
                    console.log(tweets[i]);
                }
            });
        }
    }
    console.log("modified tweets");
    console.log(tweets);
    return tweets;
}

let getDashboardTweets =  async (message, callback) => {
    let followersList = ['999', '1000'];
    console.log(followersList);
    await tweet.find({userId : { $in : followersList } }).lean().exec(async(err, result) => {
        if(err) {
            console.log("unable to insert into database", err);
            callback(err, "Database Error");
        } else if(result){
            console.log("tweets returned!!");
            console.log(result);
            result = await processTweets(result);
             callback(null, { status: 200,  message: result });
        } else {
           callback(null, { status: 200,  message:"tweets list cannot be returned!!" });
        }
    });
};

let bookmarkATweet = (message, callback) => {
    let { userId, tweetId } = message;
    console.log("in bookmarkATweet..", message);
    tweet.update({"_id" : tweetId}, {$push: {'bookmarks' : userId}}, (err, result) => {
        if(err) {
            console.log('unable to insert into database', err);
            callback(err, 'Database Error');
        } else if(result){
            console.log('bookmarking a tweet...');
            callback(null, {status:200, message: "tweet bookmarked!"})
        } else {
            callback(null, { status: 200,  message:"tweet  cannot be bookmarked!!" });
        }
    });
}

let unbookmarkATweet = (message, callback) => {
    let { userId, tweetId } = message;
    console.log("in unbookmarkATweet..", message);
    tweet.update({"_id" : tweetId}, {$pull: {'bookmarks' : userId}}, (err, result) => {
        if(err) {
            console.log('unable to insert into database', err);
            callback(err, 'Database Error');
        } else if(result){
            console.log('bookmarking a tweet...');
            callback(null, {status:200, message: "bookmark is removed!"})
        } else {
            callback(null, { status: 200,  message:"bookmark  cannot be  removed!!" });
        }
    });
}

let deleteATweet = (message, callback) => {
    let { userId, tweetId } = message;
    console.log("in bookmarkATweet..");
    tweet.remove({"_id" : tweetId}, (err, result) => {
        if(err) {
            console.log('unable to delete into database', err);
            callback(err, 'Database Error');
        } else if(result){
            console.log('deleting a tweet...');
            callback(null, {status:200, message:'tweet deleted successfully!'})
        } else {
            callback(null, { status: 200,  message:"tweet  cannot be deleted!!" });
        }
    });
}



let retweetWithoutComment = (message, callback) => {
    let {userId, tweetId}  = message;
    tweet.update({'_id': tweetId}, {$push: {'retweets' : userId} }, (err, result) => {
        if(err) {
            console.log('unable to delete into database', err);
            callback(err, 'Database Error');
        } else if(result){
            callback(null, {status:200, message:'tweet is retweeted'});
        } else {
            callback(null, { status: 200,  message:'tweet  cannot be deleted!!' });
        }
    });
}