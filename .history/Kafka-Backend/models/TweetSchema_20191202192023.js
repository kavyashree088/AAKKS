var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
TweetSchema = new Schema({
  userFullName: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    default: ""
  },
  profilePic: {
    type: String,
    default: ""
  },
  actualTweetId: {
    type: String,
    default: ""
  },
  tweetText: {
    type: String,
    default: ""
  },

  hashTags: [],
  media: [],
  replies: [],
  likes: [],
  retweets: [],
  createdAt: {
    type: Date,
    default: Date.now
  },
<<<<<<< HEAD
  views: {
    type: Number,
    default: 0
||||||| merged common ancestors
  views : {
      type :String,
      default : 0
=======
  views : {
      type :Number,
      default : 0
>>>>>>> keerthy
  },
<<<<<<< HEAD
  lists: [],
  bookmarks: [],
  isRetweet: {
    type: String,
    default: 'false'
  }
||||||| merged common ancestors
  lists:[],
  bookmarks:[]
=======
  lists:[],
  bookmarks:[],
  isRetweet : {
    type : String,
    default :'false'
  }
>>>>>>> keerthy
});

module.exports = mongoose.model('tweets', TweetSchema);