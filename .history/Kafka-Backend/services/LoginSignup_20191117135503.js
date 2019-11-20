const express = require('express');
const mountRoutes = require('.');
const sha1 = require('sha1');


var crypt = require('./bcrypt.js');

var app = express();
app.set('view engine', 'ejs');



router = express.Router();
var exports = module.exports = {};

exports.loginSignupService = function loginSignupService(msg, callback) {
    console.log("e path:", msg.path);
    switch (msg.path) {
        case "signup":
            signup(msg, callback);
            break;
        case "login":
            login(msg, callback);
            break;
    }
};



function signup(msg, callback) {

    console.log("In buyer Signup topic service. Msg: ", msg);
    Users.findOne({ email: msg.formatEmail }, function (err, rows) {
        if (err) {
            console.log(err);
            console.log("unable to read the database");
            callback(err, "Database Error");
        } else {
            if (rows) {
                console.log("User already exists");
                callback(null, { status: 401, rows });
            } else {
                crypt.newHash(msg.body.buyerPassword, function (response) {
                    enPassword = response;
                    console.log("Encrypted password: " + enPassword);
                    var userData = {
                        "buyerName": msg.body.buyerName,
                        "buyerEmail": msg.formatEmail,
                        "buyerPassword": enPassword,
                        "buyerPhoneNumber": msg.body.buyerPhone,
                        "buyerAddress": msg.body.buyerAddress

                    }
                    //Save the user in database
                    Users.create(userData, function (err, user) {
                        if (err) {
                            console.log("unable to insert into database", err);
                            callback(err, "Database Error");
                        } else {
                            console.log("User Signup Successful");
                            callback(null, { status: 200, user });
                        }
                    });
                });
            }
        }
    });
}

function login(msg, callback) {

    console.log("In login topic service. Msg: ", msg);
    console.log("password check in buyer sign in")
    console.log(msg.body.buyerPassword)
    Users.findOne({ buyerEmail: msg.formatEmail }, function (err, user) {
        if (err) {
            console.log(err);
            console.log("unable to read the database");
            callback(err, "unable to read the database");
        } else if (user) {
            console.log("user:", user)
            crypt.compareHash(msg.body.buyerPassword, user.buyerPassword, function (err, isMatch) {
                if (isMatch && !err) {
                    console.log("Login Successful");
                    callback(null, { status: 200, user });
                    console.log("creating token");
                } else {
                    console.log("Authentication failed. Passwords did not match");
                    callback(null, { status: 400 });
                }
            })
        } else {
            callback(null, { status: 400 });
        }
    });

}


//module.exports = router;