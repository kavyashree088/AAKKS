var connection = new require("./kafka/Connection");
var loginSignUp = require("./services/loginSignup.js")

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://root:root@clusterkc-shard-00-00-cr6mm.mongodb.net:27017,clusterkc-shard-00-01-cr6mm.mongodb.net:27017,clusterkc-shard-00-02-cr6mm.mongodb.net:27017/grubhub?ssl=true&replicaSet=ClusterKC-shard-0&authSource=admin&retryWrites=true&w=majority",
  { useNewUrlParser: true, poolSize: 10 },
  function (err) {
    if (err) {
      console.log(err);
      console.log("ERROR! MONGO MONGOOSE");
      throw err;
    } else {
      console.log("Successfully connected to MongoDB");
    }
  }
);

function handleTopicRequest(topicName, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topicName);
  var producer = connection.getProducer();
  console.log("server is running ");
  
  consumer.on("message", function (message) {
    console.log("message received for " + topicName + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    
    switch (topicName) {
      case "loginSignupTopic":
        loginSignUp.userService(data.data, function (err, res) {
          response(data, res, producer);
          return;
        });
        break;
      
      case "messageActions":
        messageService.messageService(data.data, function (err, res) {
          response(data, res, producer);
          return;
        });
        break;
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
handleTopicRequest("userActions", userService);
handleTopicRequest("ownerActions", ownerService);
handleTopicRequest("orderActions", orderService);
handleTopicRequest("messageActions", messageService);
