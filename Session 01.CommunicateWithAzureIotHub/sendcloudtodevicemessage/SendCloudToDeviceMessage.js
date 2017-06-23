'use strict';

var Client = require('azure-iothub').Client;
var Message = require('azure-iot-common').Message;

//var connectionString = 'HostName=MOM-CS-01.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=lmjmAaWoLwp2wmngWRypEcSO4eqim8/FD5kqWjb9dG0=';
var connectionString = 'HostName=missionmarsvancouver.azure-devices.net;SharedAccessKeyName=coffeeclient;SharedAccessKey=5HM6kAUK5hiN03y5oWfQUbDz84x2sX+ZBYyPNPY/SRE=';
var targetDevice = 'coffeepot';
var serviceClient = Client.fromConnectionString(connectionString);


function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}

function receiveFeedback(err, receiver){
  receiver.on('message', function (msg) {
    console.log('Feedback message:')
    console.log(msg.getData().toString('utf-8'));
  });
}

serviceClient.open(function (err) {
  if (err) {
    console.error('Could not connect: ' + err.message);
  } else {
    console.log('Service client connected');
    serviceClient.getFeedbackReceiver(receiveFeedback);

    var obj = new Object();
        obj.Command = "Brew";
        obj.Team = "team16";
        obj.Parameters =false;
    var message = new Message(JSON.stringify(obj));
    message.ack = 'full';
    message.messageId = "My Message ID";
    console.log('Sending message: ' + message.getData());
    serviceClient.send(targetDevice, message, printResultFor('send'));
  }
});
