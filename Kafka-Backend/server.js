var connection = new require("./kafka/Connection");
// var userService = require("./services/userService");
// var ownerService = require("./services/ownerService")
// var orderService = require("./services/orderService")
// var messageService = require("./services/messageService")
var tweetTopics = require('./services/tweetTopics.js');
var listTopics = require('./services/listTopics');


// Set up Database connection
var config = require('./config/settings');
var mongoose = require('mongoose');
//var connStr = config.database_type + '://' + config.database_username + ':' + config.database_password + '@' + config.database_host + ':' + config.database_port + '/' + config.database_name;
var connStr = config.connection_string;
console.log(connStr);
mongoose.connect(connStr, { useNewUrlParser: true, poolSize: 10 }, function (err) {
    if (err) throw err;
    else {
        console.log('Successfully connected to MongoDB');
    }
});

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    switch (topic_name) {
      case "listTopics":
        listTopics.listTopicService(data.data, function (err, res) {
          response(data, res, producer);
          return;
        });
        break;
        case "tweetTopics":
                tweetTopics.tweetTopicService(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                });
                break;
      // case "userActions":
      //   userService.userService(data.data, function (err, res) {
      //     response(data, res, producer);
      //     return;
      //   });
      //   break;
    //   case "ownerActions":
    //     ownerService.ownerService(data.data, function (err, res) {
    //       response(data, res, producer);
    //       return;
    //     });
    //     break;
    //   case "orderActions":
    //     orderService.orderService(data.data, function (err, res) {
    //       response(data, res, producer);
    //       return;
    //     });
    //     break;
    //   case "messageActions":
    //     messageService.messageService(data.data, function (err, res) {
    //       response(data, res, producer);
    //       return;
    //     });
    //     break;
    
    }
  });
}
function response(data, res, producer) {
  console.log("after handle", res);
  var payloads = [
    {
      topic: data.replyTo,
      messages: JSON.stringify({
        correlationId: data.correlationId,
        data: res
      }),
      partition: 0
    }
  ];
  producer.send(payloads, function (err, data) {
    console.log("producer send", data);
  });
  return;
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
// handleTopicRequest("userActions", userService);
// handleTopicRequest("ownerActions", ownerService);
// handleTopicRequest("orderActions", orderService);
// handleTopicRequest("messageActions", messageService);
handleTopicRequest("tweetTopics", tweetTopics);
 handleTopicRequest("listTopics", listTopics);





