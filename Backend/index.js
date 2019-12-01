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

const createListRouter = require('./Routes/createList');
const addMemberRouter = require('./Routes/addMember');
const removeMemberRouter = require('./Routes/removeMember');
const findMemberRouter = require('./Routes/findMember');
const deleteListRouter = require('./Routes/deleteList');
const showListTweetRouter = require('./Routes/showListTweet');
const showMemberRouter = require('./Routes/showMember');
const showMemberListRouter = require('./Routes/showMemberList');
const showMyListRouter = require('./Routes/showMyList');
const showSubscribedListRouter = require('./Routes/showSubscribedList');
const showSubscriberRouter = require('./Routes/showSubscriber');
const subscribeListRouter = require('./Routes/subscribeList');
const unsubscribeListRouter = require('./Routes/unsubscribeList');
const updateListRouter = require('./Routes/updateList');

const bookmarkTweetRouter = require('./Routes/bookmarkTweet');
const getBookmarksRouter = require('./Routes/getBookmarks');

app.use('/createList',createListRouter);
app.use('/addMember',addMemberRouter);
app.use('/findMember',findMemberRouter);
app.use('/removeMember',removeMemberRouter);
app.use('/deleteList',deleteListRouter);
app.use('/showListTweet',showListTweetRouter);
app.use('/showMember',showMemberRouter);
app.use('/showMemberList',showMemberListRouter);
app.use('/showMyList',showMyListRouter);
app.use('/showSubscribedList',showSubscribedListRouter);
app.use('/showSubscriber',showSubscriberRouter);
app.use('/subscribeList',subscribeListRouter);
app.use('/unsubscribeList',unsubscribeListRouter);
app.use('/updateList',updateListRouter);

app.use('/getBookmarks',getBookmarksRouter);
app.use('/bookmarkTweet',bookmarkTweetRouter);

// const userActions = require("./routes/userActions");
// const ownerAction = require("./routes/ownerActions");
// const orderAction = require("./routes/orderActions");
// const messageAction = require("./routes/messageActions");
// app.use("/user", userActions);
// app.use("/owner", ownerAction);
// app.use(orderAction);
// app.use("/message", messageAction);
// app.use("/uploads", express.static(__dirname + "/uploads"));


//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");












