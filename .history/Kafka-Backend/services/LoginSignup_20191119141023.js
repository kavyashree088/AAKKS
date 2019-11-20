const express = require('express');
const mountRoutes = require('.');
const sha1 = require('sha1');


var crypt = require('./bcrypt.js');

var app = express();
app.set('view engine', 'ejs');
const dbConnection = require('./../database/dbConnectionPool');



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

function checkIfUserExists(table, email) {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      let result = await con.query('SELECT * FROM ?? WHERE username = ?', [table, email]);
      await con.query("COMMIT");
      result = JSON.parse(JSON.stringify(result));
      return result;
    } catch (ex) {
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  }

async function signup(msg, callback) {

    console.log("In buyer Signup topic service. Msg: ", msg);
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      let savedUser = await con.query('INSERT INTO ?? SET ?', [table, inputData]);
      await con.query("COMMIT");
      inputData.id = savedUser.insertId;
      console.log(inputData);
      return inputData;
    } catch (ex) {
      console.log(ex);
      await con.query("ROLLBACK");
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
}

function login(msg, callback) {

    console.log("In login topic service. Msg: ", msg);
    console.log("password check in buyer sign in")
    console.log(msg.body.buyerPassword)
    // Users.findOne({ buyerEmail: msg.formatEmail }, function (err, user) {
    //     if (err) {
    //         console.log(err);
    //         console.log("unable to read the database");
    //         callback(err, "unable to read the database");
    //     } else if (user) {
    //         console.log("user:", user)
    //         crypt.compareHash(msg.body.buyerPassword, user.buyerPassword, function (err, isMatch) {
    //             if (isMatch && !err) {
    //                 console.log("Login Successful");
    //                 callback(null, { status: 200, user });
    //                 console.log("creating token");
    //             } else {
    //                 console.log("Authentication failed. Passwords did not match");
    //                 callback(null, { status: 400 });
    //             }
    //         })
    //     } else {
    //         callback(null, { status: 400 });
    //     }
    // });

}


//module.exports = router;