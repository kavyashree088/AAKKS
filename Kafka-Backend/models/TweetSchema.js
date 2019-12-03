var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
TweetSchema = new Schema({
  userId: {
    type: String,
    default: ''
  },
  userName : {
    type: String,
    default : ""
  },
  profilePic : {
    type : String,
    default :""
  },
  actualTweetId : {
    type: String,
    default :""
  },
  tweetText:{
    type: String,
    default :""
  },
  hashTags : [],
  media:[],
  replies:[],
  likes:[],
  retweets:[],
  createdAt : {
      type: Date,
      // default :""
  },
  views : {
      type :String,
      default : 0
  },
  lists:[],
  bookmarks:[]
});

module.exports = mongoose.model('tweets', TweetSchema);