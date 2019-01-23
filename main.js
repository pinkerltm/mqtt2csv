var mqtt = require('mqtt');
var json2csv = require('json2csv');
var fs = require('fs');
var csvWriter = require("csv-write-stream");
var client  = mqtt.connect('mqtt://localhost');
 
client.on('connect', function () {
	client.subscribe('persist');
	client.publish('presence', 'Hello! MQTT to CSV writer daemon is online.');
});
 
client.on('message', function (topic, message) {
  if(topic=='persist'){
  	//var myData = message.toString();
	//var writer = csvWriter({sendHeaders: false});
	//writer.pipe(fs.createWriteStream('file.csv',{ 'flags': 'a'}));
	file = fs.createWriteStream('file.csv', {'flags': 'a'});
	file.write(message.toString() + '\n');
	file.end();
  }
});
