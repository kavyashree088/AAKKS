var { message } = require("../models/MessageSchema");

exports.messageTopics = function messageService(msg, callback) {
    console.log("msg", msg);
    console.log("In Property Service path:", msg.path);
    switch (msg.path) {
        case "getMessages":
            getMessages(msg, callback);
            break;
        case "postMessages":
            postMessages(msg, callback);
            break;
    }
};
async function getMessages(msg, callback) {
    console.log(msg);
    try {
        await message.find(
            {
                $or: [
                    { user1: msg.body.sender },
                    { user2: msg.body.sender }
                ]
            }, (err, result) => {
                if (err) {
                    callback(null, {
                        status: 400,
                        message: err.message
                    });
                }
                callback(null, result);
            });
    } catch (error) {
        callback(null, {
            status: 400,
            message: error.message
        });
    }
}

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
                    { user1: msg.body.sender },
                    { user2: msg.body.sender }
                ]
            }, (err, result) => {
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
                        {
                            $or: [
                                { user1: msg.body.sender },
                                { user2: msg.body.sender }
                            ]
                        },
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
                    let newMessage = new message({
                        user1: req.body.senderId,
                        user2: req.body.recieverId,
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
                }
            });
    } catch (error) {
        callback(null, {
            status: 400,
            message: error.message
        });
    }
}