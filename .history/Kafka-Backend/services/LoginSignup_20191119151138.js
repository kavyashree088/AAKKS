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



async function signup(msg, callback) {

    console.log("In user Signup topic service. Msg: ", msg);
    console.log(msg.body)
    let con = await dbConnection();
    let enPassword;
    let inputData;
    
    crypt.newHash(msg.body.userPassword, function (response) {
        enPassword = response;
    
      

     inputData = {
        "username": msg.body.username,
        "firstname": msg.body.firstName,
        "lastname": msg.body.lastname,
        "email": msg.body.email,
        "password": enPassword,
        "state": msg.body.state,
        "city": msg.body.city,
        "zipcode": msg.body.zipcode
    }
})
console.log("Encrypted password: " + enPassword);
    console.log(inputData)

    try {
        await con.query("START TRANSACTION");
        let ifUserExists = await con.query('select * FROM ?? where username = ?', [users, msg.body.username]);
        await con.query("COMMIT");
        result = JSON.parse(JSON.stringify(result));
        if (ifUserExists == null) {
            let savedUser = await con.query('INSERT INTO ?? SET ?', [users, inputData]);
            await con.query("COMMIT");
            inputData.id = savedUser.insertId;
            console.log(inputData);
            return inputData;
        }
        else {
            return result;
        }

    }
    catch (ex) {
        console.log(ex);
        await con.query("ROLLBACK");
        console.log(ex);
        throw ex;
    } finally {
        await con.release();
        await con.destroy();
    }


}


async function login(msg, callback) {

    console.log("In login topic service. Msg: ", msg);
    console.log("password check in buyer sign in")
    console.log(msg.body.userPassword)
    let con = await dbConnection();
    try {
        await con.query("START TRANSACTION");
        //select * from buyerTable where emailId = 'admin' and userPassword = 'd033e22ae348aeb5660fc2140aec35850c4da997'
        let result = await con.query('SELECT * FROM ?? WHERE username = ? AND userPassword = ?', [table, emailId, password]);
        await con.query("COMMIT");
        result = JSON.parse(JSON.stringify(result));
        console.log("result in login db" + result)
        return result;
    } catch (ex) {
        console.log(ex);
        throw ex;
    } finally {
        await con.release();
        await con.destroy();
    }
}



//module.exports = router;