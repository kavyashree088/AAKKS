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


// Users.findOneAndUpdate({ '_id': msg.id }, {
//     $set:
//     {
//         "buyerName": msg.body.buyerName,
//         "buyerEmail": msg.body.buyerEmailId,
//         "buyerPhoneNumber": msg.body.buyerPhone,
//         "buyerAddress": msg.body.buyerAddress
//     }
async function updateProfile(msg, callback) {

    console.log("In user updateProfile topic service. Msg: ", msg); 
    console.log(msg)

    Users.findOne({ username: msg.data.profileDetails.username }, async function (err, rows) {
        if (err) {
            console.log(err);
            console.log("unable to read the database");
            callback(err, "Database Error");
        } else {
            if (rows) {
                console.log("User already exists");
                var userData = {
                   
                    "firstName": msg.data.profileDetails.firstName,
                    "lastName": msg.data.profileDetails.lastName,
                   
                    "state": msg.data.profileDetails.state,
                    "city": msg.data.profileDetails.city,
                    "zipcode": msg.data.profileDetails.zipcode,
                    
                }
                //Save the user in Mongo database
                Users.create(userData, function (err, user) {
                    if (err) {
                        console.log("unable to insert into database", err);
                        callback(err, "Database Error");
                    } else {
                        console.log("update Signup Successful");
                        callback(null, { status: 200, user });
                    }
                });
                //Save the user in MySQL database
                try {
                    await con.query("START TRANSACTION");
                    let savedUser = await con.query('UPDATE userMysql SET firstname = ?, lastName= ?', [msg.data.profileDetails.firstName,msg.data.profileDetails.lastName]);
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
