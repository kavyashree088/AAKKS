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
        case "postMessages":
            postMessages(msg, callback);
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
async function postMessages(msg, callback) {
    console.log(msg);
    try {
        let time = new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
        await message.find(
            {
                $or: [
                    { $and: [{ 'user1.username': msg.body.senderId }, { 'user2.username': msg.body.recieverId }] },
                    { $and: [{ 'user2.username': msg.body.senderId }, { 'user1.username': msg.body.recieverId }] }
                ]
            }, async (err, result) => {
                if (err) {
                    callback(null, {
                        status: 400,
                        message: err.message
                    });
                }
                if (result.length === 1) {
                    let updatedMessages = result[0].messages;
                    updatedMessages.push({
                        message: msg.body.message,
                        time: time,
                        sent: msg.body.sent
                    });
                    console.log(updatedMessages);
                    message.updateOne(
                        { user1: result[0].user1 },
                        { messages: updatedMessages },
                        (err, result) => {
                            if (err) {
                                callback(null, {
                                    status: 400,
                                    message: err.message
                                });
                            }
                            callback(null, result);
                        }
                    );
                } else {
                    let user1;
                    let user2;
                    await Users.findOne({ username: msg.body.senderId }, async (error, result) => {
                        user1 = new userDetails({
                            username: result.username,
                            firstName: result.firstName,
                            lastName: result.lastName,
                            image: result.profilePicture
                        })
                        console.log(user1)
                        await Users.findOne({ username: msg.body.recieverId }, async (error, result) => {
                            user2 = new userDetails({
                                username: result.username,
                                firstName: result.firstName,
                                lastName: result.lastName,
                                image: result.profilePicture
                            })
                            console.log(user2)

                            let newMessage = new message({
                                user1: user1,
                                user2: user2,
                                messages: [
                                    {
                                        message: req.body.message,
                                        time: time,
                                        sent: req.body.sent
                                    }
                                ]
                            });
                            newMessage.save((err, result) => {
                                if (err) {
                                    callback(null, {
                                        status: 400,
                                        message: err.message
                                    });
                                }
                                callback(null, result);
                            });
                        })
                    })
                }
            });
    } catch (error) {
        callback(null, {
            status: 400,
            message: error.message
        });
    }
}