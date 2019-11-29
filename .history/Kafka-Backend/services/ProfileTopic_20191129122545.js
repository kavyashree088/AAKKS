const express = require('express');

var app = express();
app.set('view engine', 'ejs');

var Users = require('../models/UserSchema');

router = express.Router();
var exports = module.exports = {};

exports.profileTopicService = function profileTopicService(msg, callback) {
    console.log("e path:", msg.path);
    switch (msg.path) {
        case "getProfileDetails":
                getProfileDetails(msg, callback);
            break;
        case "updateProfile":
            updateProfile(msg,callback);
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
        } else{
            console.log(" got user ");
            callback(null, { status: 200, rows });
        }
    });

}

async function updateProfile(msg, callback) {

    console.log("In user updateProfile topic service. Msg: ", msg); 
    console.log(msg)

    Users.findOne({ username: msg.data.profileDetails.username }, { username: msg.data.username }, async function (err, rows) {
        if (err) {
            console.log(err);
            console.log("unable to read the database");
            callback(err, "Database Error");
        } else {
            if (rows) {
                console.log("User already exists");
                callback(null, { status: 401, rows });
            } else {
                var userData = {
                    "username": msg.data.username,
                    "firstName": msg.data.firstName,
                    "lastName": msg.data.lastName,
                    "username": msg.data.username,
                    "email": msg.formatEmail,
                    "state": msg.data.state,
                    "city": msg.data.city,
                    "zipcode": msg.data.zipcode,
                    "active": true
                }
                //Save the user in Mongo database
                Users.create(userData, function (err, user) {
                    if (err) {
                        console.log("unable to insert into database", err);
                        callback(err, "Database Error");
                    } else {
                        console.log("User Signup Successful");
                        callback(null, { status: 200, user });
                    }
                });
                //Save the user in MySQL database
                try {
                    await con.query("START TRANSACTION");
                    let savedUser = await con.query('INSERT INTO userMysql SET ?', [msg.inputData]);
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
        }
    });


}
