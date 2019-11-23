
var connection = new require('./kafka/Connection');

//topics file
var SignupSignin = require('./services/LoginSignup')
var dbConnection = require('./database/dbConnectionPool');

var connection = new require('./kafka/Connection');

//topics file
var tweetTopics = require('./services/tweetTopics.js');

// Set up Database connection
var config = require('./config/settings');
var mongoose = require('mongoose');
//var connStr = config.database_type + '://' + config.database_username + ':' + config.database_password + '@' + config.database_host + ':' + config.database_port + '/' + config.database_name;
var connStr = config.connection_string;
console.log(connStr);

//MySQL DB Connection 
testDBConection = async () => {
  let con = await dbConnection();
  if (con) {
    console.log("Connected to Database");
  }
}
testDBConection();

mongoose.connect(connStr, { useNewUrlParser: true, poolSize: 10 }, function (err) {
  if (err) throw err;
  else {
    console.log('Successfully connected to MongoDB');
  }
});

console.log('Kafka server is running ');

function handleTopicRequest(topic_name, fname) {
  console.log("topic_name:", topic_name)
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  consumer.on('error', function (err) {
    console.log("Kafka Error: Consumer - " + err);
  });
  consumer.on('message', function (message) {
    console.log('message received for ' + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    switch (topic_name) {
      case "tweetTopics":
        tweetTopics.tweetTopicService(data.data, function (err, res) {
          response(data, res, producer);
          return;
        });
      case 'loginSignuptopic':
        SignupSignin.loginSignupService(data.data, function (err, res) {
          console.log("app.js")
          response(data, res, producer);
          return;
        });
        break;
    }
  })
};

function response(data, res, producer) {
  console.log('after handle', res);
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
    console.log('producer send', data);
  });
  return;
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("loginSignuptopic", SignupSignin);
handleTopicRequest("tweetTopics", tweetTopics);
