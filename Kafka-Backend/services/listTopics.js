let Lists = require("../models/Lists");
let Users=require('../models/UserSchema');
exports.listTopicService = function listTopicService(msg, callback) {
  console.log("In List Service path:", msg.path);
  switch (msg.path) {
    case "createList":
      createList(msg, callback);
      break;
    case "addMember":
      addMember(msg, callback);
      break;
    case "deleteList":
      deleteList(msg, callback);
      break;
    case "showListTweet":
      showListTweet(msg, callback);
      break;
    case "showMember":
      showMember(msg, callback);
      break;
    case "showMemberList":
      showMemberList(msg, callback);
      break;
    case "showMyList":
      showMyList(msg, callback);
      break;
    case "showSubscribedList":
      showSubscribedList(msg, callback);
      break;
    case "showSubscriber":
      showSubscriber(msg, callback);
      break;
    case "subscribeList":
      subscribeList(msg, callback);
      break;
    case "unsubscribeList":
      unsubscribeList(msg, callback);
      break;
    case "updateList":
      updateList(msg, callback);
      break;
  }
};

let createList = function(msg, callback) {
  //let userId = message.userId;
  console.log(msg.listDetails.creatorName);
  let respmsg = "";
  var list = Lists({
    listname: msg.listDetails.listname,
    description: msg.listDetails.description,
    creatorID: msg.listDetails.creatorID,
    creatorName :msg.listDetails.creatorName,
    memberID: msg.listDetails.members
  });

console.log(list);
  list.save(function(error, results) {
    if (error) {
      console.log("alaukika:P");
      console.log(error);
      respmsg = "error";
      var pkg = {
        msg: respmsg
      };
      callback(null, pkg);
    } else {
      respmsg = "List Created Successfully!";
      var pkg = {
        msg: respmsg
      };
      callback(null, pkg);
    }
  });
};

let addMember = function(msg, callback) {
  console.log(msg.listDetails);
  Users.find(function(err,result,fields){
    callback(null, result);
    console.log("after callback");
  })
};

let deleteList = function(msg, callback) {
  console.log(msg.listDetails);
  Lists.findOneAndDelete({_id : msg.listDetails.listID},function(err,result,fields){
    if(err) throw err;  
      callback(null, "List Deleted");
      console.log("after callback");
  })
};

let showListTweet = function(msg, callback) {
  console.log(msg.listDetails);

  Lists.find({_id:msg.listDetails.id}, {memberID:1}, function(err,result,fields){
    // if(err) throw err;
    // Tweets.find({userID : { $in:resultArray}}, function(err,result,fields){
    //   if(err) throw err;
    callback(null, result);
    console.log("after callback");
  })
  
}

let showMember = function(msg, callback) {
  console.log(msg.listDetails);
  Users.find({listMember:msg.listDetails.listID}, function(err,result,fields){
    callback(null, result);
    console.log("after callback");
  })

};

let showMemberList = function(msg, callback) {
  console.log(msg.listDetails);
  Lists.find({memberID:msg.listDetails.userID}, function(err,result,fields){
    callback(null, result);
    console.log("after callback");
  })
};

let showMyList = function(msg, callback) {
  console.log(msg.listDetails);
  Lists.find({creatorID:msg.listDetails.userID}, function(err,result,fields){
    callback(null, result);
    console.log("after callback");
  })
};

let showSubscribedList = function(msg, callback) {
  console.log(msg.listDetails);
  console.log(msg.listDetails);
  Lists.find({subscriberID:msg.listDetails.userID}, function(err,result,fields){
    callback(null, result);
    console.log("after callback");
  })
};

let showSubscriber = function(msg, callback) {
  console.log(msg.listDetails);
  Users.find({listSubscriber:msg.listDetails.listID}, function(err,result,fields){
    callback(null, result);
    console.log("after callback");
  })
};

let subscribeList = function(msg, callback) {
  console.log(msg.listDetails);
  Lists.update({_id:msg.listDetails.listID},{ $addToSet: { subscriberID: msg.listDetails.userID } }, function(err,result,fields){
    Users.update({username:msg.listDetails.userID},{ $addToSet: { listSubscriber: msg.listDetails.listID } }, function(err,result,fields){
      callback(null, result);
      console.log("after callback");
    })
  })
};


let unsubscribeList = function(msg, callback) {
  console.log(msg.listDetails);
  Lists.update({_id:msg.listDetails.listID},{ $pull: { subscriberID: msg.listDetails.userID } }, function(err,result,fields){
    Users.update({username:msg.listDetails.userID},{ $pull: { listSubscriber: msg.listDetails.listID } }, function(err,result,fields){
      callback(null, result);
      console.log("after callback");
    })
  })
};

let updateList = function(msg, callback) {
  console.log(msg.listDetails);
  Lists.findOneAndUpdate({_id:msg.listDetails.listID},{listname:msg.listDetails.listname, description:msg.listDetails.description},function(err,result,fields){
    callback(null, result);
    console.log("after callback");
  })
};
