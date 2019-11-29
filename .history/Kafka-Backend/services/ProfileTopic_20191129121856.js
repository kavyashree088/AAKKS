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
