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
var kafka = require("./kafka/client");
var passport = require('passport');



console.log("Initializing passport");
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('./config/passport').passport;

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

const createListRouter = require('./Routes/ListRoutes/createList');
const addMemberRouter = require('./Routes/ListRoutes/addMember');
const removeMemberRouter = require('./Routes/ListRoutes/removeMember');
const findMemberRouter = require('./Routes/ListRoutes/findMember');
const deleteListRouter = require('./Routes/ListRoutes/deleteList');
const showListTweetRouter = require('./Routes/ListRoutes/showListTweet');
const showMemberRouter = require('./Routes/ListRoutes/showMember');
const showMemberListRouter = require('./Routes/ListRoutes/showMemberList');
const showMyListRouter = require('./Routes/ListRoutes/showMyList');
const showSubscribedListRouter = require('./Routes/ListRoutes/showSubscribedList');
const showSubscriberRouter = require('./Routes/ListRoutes/showSubscriber');
const subscribeListRouter = require('./Routes/ListRoutes/subscribeList');
const unsubscribeListRouter = require('./Routes/ListRoutes/unsubscribeList');
const updateListRouter = require('./Routes/ListRoutes/updateList');

const loginSignupRoutes = require('./Routes/LoginSignup')
const messageRoutes = require('./Routes/messageRoutes')
const profileDetailsRoutes = require('./Routes/ProfileDetails')

const tweetRoutes = require('./Routes/tweetRoutes');

//const bookmarkTweetRouter = require('./Routes/bookmarkTweet');
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


app.use('/uploads', express.static(path.join(__dirname, '/uploads/')));
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use('/messages', messageRoutes);
app.use(bodyParser.json());

app.use('/', loginSignupRoutes);
app.use('/', tweetRoutes);
app.use('/', profileDetailsRoutes);

//app.use('/bookmarkTweet',bookmarkTweetRouter);


// app.get('/getTweetDetails', (req, res) => {
//   console.log("in gettweetdetails..");
//   console.log(req.body);
// });
// app.use('/', tweetRoutes);
// app.use('/', tweetRoutes);


//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");












