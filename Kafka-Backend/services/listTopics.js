let Lists= require('../models/Lists');

exports.listTopicService = function listTopicService(msg, callback) {
    console.log("In List Service path:", msg.path);
    switch (msg.path) {
        case "createList":
            createList(msg, callback);
            break;
    }
};


let createList = function(msg, callback){
    //let userId = message.userId;
    console.log(msg.listDetails)
let respmsg ="";
    var list = Lists({
        listname: msg.listDetails.listname,
        description: msg.listDetails.description,
        creatorID: msg.listDetails.creatorID,
        memberID: msg.listDetails.members
      });

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