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
        case 'getTweetDetails':
            getTweetDetails(msg, callback);
            break;
    }
};

let writeATweet = async(message, callback) => {
    //let username = message.username;
    let tweetDetails = message.tweetDetails;
    console.log("In tweet topics : writeATweet ", message);
    let tweetText = tweetDetails.tweetText;
    if(tweetText){
        let hashTags = tweetText.toLowerCase().match(/#\w*/g);
        tweetDetails.hashTags = hashTags;
    }
    let {username} = tweetDetails;
    let profilePic= '';
    await user.findOne({username}, async (err, result) => {
        if(err){
            console.log("unable to insert into database", err);
            callback(err, "Database Error");
        } else if(result){
            profilePic = result.profilePicture ? result.profilePicture : 'profileAlias.jpg';
            tweetDetails.profilePic = profilePic;
            await tweet.create(tweetDetails, function(err, result){
                if(err){
                    console.log("unable to insert into database", err);
                    callback(err, "Database Error");
               } else if(result) {
                   console.log("result is..");
                   console.log(result);
                   callback(null, { status: 200,  message:"Tweet is added successfully!!" });
               } else {
                callback(null, { status: 401,  message:"Tweet cannot be added !!" });
               }
            });
        } else {
            callback(null, { status: 401,  message:"Tweet cannot be added !!" });
        }
        
    });
    
};

let replyATweet = async (message, callback) => {
    let {username, userFullName, tweetId, replyText} = message;
    let profilePic= '';
    await user.findOne({username}, (err, result) => {
        console.log("result is..");
        console.log(result);
        if(err){
            console.log("unable to insert into database", err);
            callback(err, "Database Error");
        } else {
            if(result){
                profilePic = result.profilePicture ? result.profilePicture : 'profileAlias.jpg';
                tweet.update({_id: tweetId}, {$push : {'replies' : {username, userFullName, profilePic, replyText}}}, (err, result) => {
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
                       callback(null, { status: 401,  message:"reply cannot be added!!" });
                    }
                });
            } else {
                callback(null, { status: 401,  message:"reply cannot be added!!" });
            }
        }
    });
    
}

let getUserTweets = (message, callback) => {
    let username = message.username;
    tweet.find({username}, (err, result)=>{
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

let likeATweet = async function(message, callback){
    let { tweetId, username, userFullName } = message;
    let profilePic= '';
    await user.findOne({username}, (err, result) => {
        if(err){
            console.log("unable to find in database", err);
            callback(err, "Database Error");
       } else if(result){
            profilePic = result.profilePicture ? result.profilePicture : 'profileAlias.jpg';
            console.log("In tweet topics : likeATweet ", message);
            tweet.update({"_id" : tweetId}, {$push:{"likes":{username, userFullName, profilePic}}}, (err, result) => {
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
                    callback(null, { status: 401,  message:"like cannot be added!!" });
                }
            });
       } else {
        callback(null, { status: 401,  message:"like cannot be added!!" });
       } 
    });
    
};

let unlikeATweet = function(message, callback){
    //remove username from likes
    let { tweetId, username } = message;
    console.log("In tweet topics : unlikeATweet ", message);
    tweet.update({"_id" : tweetId}, {$pull:{"likes":{'username':username}}}, (err, result) => {
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
    let {username, pageNum, pageSize} = message;
    let offset = (pageNum-1) * pageSize;
    let followingActive = [], following = [];
    await user.findOne({username}, async (err, result) => {
        if(err){
            console.log("unable to insert into database", err);
            callback(err, "Database Error");
        } else {
            console.log("result  is..");
            console.log(result);
            if(result){
               following = result.following; 
               if(following && following.length > 0){
                for(let i = 0; i < following.length; i++){
                    let person1 = following[i];
                    console.log("person1 is..");
                    console.log(person1);
                    await user.findOne({'username' : person1}, (err, result) => {
                        console.log("user follower result..");
                        console.log(result);
                        if(result && result.active){
                            followingActive.push(person1);
                        }
                    });
                }
              } 
              console.log("followingactive..");
              console.log(followingActive);
              if(followingActive && followingActive.length > 0){
                await tweet.find({username : { $in : followingActive } }).sort({ createdAt : -1}).skip(offset).limit(pageSize).lean().exec(async(err, result) => {
                    if(err) {
                        console.log("unable to insert into database", err);
                        callback(err, "Database Error");
                    } else if(result && result.length > 0){
                        console.log("tweets returned!!");
                        console.log(result);
                        result = await processTweets(result);
                        callback(null, { status: 200,  message: result });
                    } else {
                       callback(null, { status: 401,  message:"tweets list cannot be returned!!" });
                    }
                });
               } else {
                  callback(null, { status: 401,  message:"tweets list cannot be returned!!" });
               }
            } else {
                callback(null, { status: 401,  message:"tweets list cannot be returned!!" });
            }
        }
    }); 
};

let getTweetDetails = (message, callback) => {
    let {tweetId} = message;
    tweet.findOneAndUpdate({'_id':tweetId}, {$inc:{'views':1}}, {returnNewDocument : true}, (err,result) => {
        if(err){
            console.log('unable to insert into database', err);
            callback(err, 'Database Error');
        } else if (result){
            console.log('returning tweet details...');
            callback(null, {status:200, message: result});
        } else {
            callback(null, {status:401, message: "tweet details cannot be returned!"})
        }
    });
}

let bookmarkATweet = (message, callback) => {
    let { username, tweetId } = message;
    console.log("in bookmarkATweet..", message);
    tweet.update({"_id" : tweetId}, {$push: {'bookmarks' : username}}, (err, result) => {
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
    let { username, tweetId } = message;
    console.log("in unbookmarkATweet..", message);
    tweet.update({"_id" : tweetId}, {$pull: {'bookmarks' : username}}, (err, result) => {
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
    let { username, tweetId } = message;
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



let retweetWithoutComment = async (message, callback) => {
    let {username, userFullName, tweetId}  = message;
    let profilePic= '';
    await user.findOne({username}, (err, result) => {
        if(err){
            console.log("unable to insert into database", err);
            callback(err, "Database Error");
        } else if(result){
            profilePic = result.profilePicture ? result.profilePicture : 'profileAlias.jpg';
            tweet.update({'_id': tweetId}, {$push: {'retweets' : {username, userFullName, profilePic} }} , (err, result) => {
                if(err) {
                    console.log('unable to delete into database', err);
                    callback(err, 'Database Error');
                } else if(result){
                    callback(null, {status:200, message:'tweet is retweeted'});
                } else {
                    callback(null, { status: 200,  message:'tweet  cannot be retweeted!!' });
                }
            });
        } else {
            callback(null, { status: 200,  message:'tweet  cannot be retweeted!!' });
        }
    });
    
}