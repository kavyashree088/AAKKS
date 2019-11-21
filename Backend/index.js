//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
var morgan = require('morgan');
var config = require('./config/settings');
var config = require('./config/settings');
var kafka = require("./kafka/client");


//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});


var mongoose = require('mongoose');
//var connStr = config.database_type + '://' + config.database_username + ':' + config.database_password + '@' + config.database_host + ':' + config.database_port + '/' + config.database_name;
var connStr = config.connection_string;
console.log(connStr);
mongoose.connect(connStr, { useNewUrlParser: true, poolSize: 10, }, function(err) {
  if (err) throw err;
  else {
      console.log('Successfully connected to MongoDB');
  }
});



const userActions = require("./routes/userActions");
const ownerAction = require("./routes/ownerActions");
const orderAction = require("./routes/orderActions");
const messageAction = require("./routes/messageActions");
app.use("/user", userActions);
app.use("/owner", ownerAction);
app.use(orderAction);
app.use("/message", messageAction);
app.use("/uploads", express.static(__dirname + "/uploads"));
//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");












