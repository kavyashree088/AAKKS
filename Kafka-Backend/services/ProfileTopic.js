const express = require('express');

var app = express();
app.set('view engine', 'ejs');

var Users = require('../models/UserSchema');
const dbConnection = require('./../database/dbConnectionPool');


router = express.Router();
var exports = module.exports = {};

exports.profileTopicService = function profileTopicService(msg, callback) {
    console.log("e path:", msg.path);
    switch (msg.path) {
        case "getProfileDetails":
            getProfileDetails(msg, callback);
            break;
        case "updateProfile":
            updateProfile(msg, callback);
            break;
        case "getAllUsers":
            getAllUsers(msg, callback);
            break;
        case "follow":
            follow(msg, callback);
            break;
        case "unfollow":
            unfollow(msg, callback);
            break;
    }
};


async function getProfileDetails(msg, callback) {

    console.log("In user getProfileDetails topic service. Msg: ", msg);

    Users.findOne({ username: msg.data }, async function (err, rows) {
        if (err) {
            console.log(err);
            console.log("unable to read the database");
            callback(err, "Database Error");
        } else {
            console.log(" got user ");
            callback(null, { status: 200, rows });
        }
    });

}


async function updateProfile(msg, callback) {

    console.log("In user updateProfile topic service. Msg: ", msg);
    console.log(msg)
    console.log(msg.data.profileDetails.username)
    let con = await dbConnection();

    try {
        Users.findOneAndUpdate({ 'username': msg.data.profileDetails.username }, {
            $set: {
                "firstName": msg.data.profileDetails.firstName,
                "lastName": msg.data.profileDetails.lastName,
                "description": msg.data.profileDetails.description,
                "state": msg.data.profileDetails.state,
                "city": msg.data.profileDetails.city,
                "zipcode": msg.data.profileDetails.zipcode,
            }
        },
            async function (err, results) {
                console.log("results:")
                console.log(results);
                console.log(err)
                if (err) {
                    console.log(err);
                    callback(err, "Database Error");
                } else {
                    if (results) {
                        console.log("results:")
                        console.log(results);
                        callback(null, { status: 200 });
                        results.save(function (err) {
                            if (!err) {
                                callback(null, { status: 200, message: "user updated successfully!!" });
                            } else {
                                callback(null, { status: 200, message: "user updated failed!!" });
                            }
                        })
                    }
                    else {
                        console.log("No results found");
                        callback(null, { status: 205 });
                    }
                }

            })
        await con.query("START TRANSACTION");
        let savedUser = await con.query('UPDATE userMysql SET firstname = ?, lastName= ?', [msg.data.profileDetails.firstName, msg.data.profileDetails.lastName]);
        await con.query("COMMIT");

        console.log(savedUser)
    } catch (ex) {
        console.log(ex);
        await con.query("ROLLBACK");
        console.log(ex);
        //callback(null, { status: 500 });
        throw ex;
    } finally {
        await con.release();
        await con.destroy();
    }

}

async function getAllUsers(msg, callback) {
    try {
        Users.find({ active: true }, (err, rows) => {
            if (err) {
                console.log(err);
                console.log("unable to read the database");
                callback(err, "Database Error");
            } else {
                console.log(" got user ");
                callback(null, { status: 200, rows });
            }
        })
    } catch (error) {
        callback(err, "Database Error");
    }
}

async function follow(msg, callback) {
    console.log(msg)
    try {
        Users.findOneAndUpdate({ "username": msg.data.following }, { $push: { "followers": msg.data.follower } }, async (err, result) => {
            if (err) {
                console.log(err);
                callback(err, "Database Error");
            } else {
                console.log(result)
                await Users.findOneAndUpdate({ "username": msg.data.follower }, { $push: { "following": msg.data.following } }, async (err, result) => {
                    if (err) {
                        console.log(err);
                        callback(err, "Database Error");
                    } else {
                        console.log(" got user ");
                        callback(null, { status: 200, result });
                    }
                })
            }
        })
    } catch (error) {
        callback(err, "Database Error");
    }
}
async function unfollow(msg, callback) {
    console.log(msg)
    try {
        Users.findOneAndUpdate({ "username": msg.data.following }, { $pull: { "followers": msg.data.follower } }, async (err, result) => {
            if (err) {
                console.log(err);
                callback(err, "Database Error");
            } else {
                console.log(result)
                await Users.findOneAndUpdate({ "username": msg.data.follower }, { $pull: { "following": msg.data.following } }, async (err, result) => {
                    if (err) {
                        console.log(err);
                        callback(err, "Database Error");
                    } else {
                        console.log(" got user ");
                        callback(null, { status: 200, result });
                    }
                })
            }
        })
    } catch (error) {
        callback(err, "Database Error");
    }
}