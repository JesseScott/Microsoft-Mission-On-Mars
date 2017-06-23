'use strict';

var EventHubClient = require('azure-event-hubs').Client;
//var connectionString = 'HostName=MOM-CS-01.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=lmjmAaWoLwp2wmngWRypEcSO4eqim8/FD5kqWjb9dG0=';
var connectionString = 'HostName=missionmarsvancouver.azure-devices.net;SharedAccessKeyName=coffeeclient;SharedAccessKey=5HM6kAUK5hiN03y5oWfQUbDz84x2sX+ZBYyPNPY/SRE=';
var printError = function (err) {
  console.log(err.message);
};

var printMessage = function (message) {
  console.log('Message received: ');
  console.log(JSON.stringify(message.body));
  console.log('');
};

var client = EventHubClient.fromConnectionString(connectionString);
client.open()
    .then(client.getPartitionIds.bind(client))
    .then(function (partitionIds) {
        return partitionIds.map(function (partitionId) {
            return client.createReceiver('team16', partitionId, { 'startAfterTime' : Date.now()}).then(function(receiver) {
                console.log('Created partition receiver: ' + partitionId)
                receiver.on('errorReceived', printError);
                receiver.on('message', printMessage);
            });
        });
    })
    .catch(printError);
