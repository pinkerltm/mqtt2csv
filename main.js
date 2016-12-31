var mqtt = require('mqtt')
var json2csv = require('json2csv');
var fs = require('fs');
var csvWriter = require("csv-write-stream")
var client  = mqtt.connect('mqtt://192.168.0.201')
 
client.on('connect', function () {
  client.subscribe('home/office/dht11/humidity')
  client.subscribe('home/office/dht11/temperature')
  client.subscribe('home/office/dht11/battery')
  client.subscribe('home/office/dht11/timestamp')
  client.subscribe('home/office/dht11/json')
  client.publish('presence', 'Hello mqtt')
})
 
client.on('message', function (topic, message) {
  if(topic=='home/office/dht11/json'){
  	var myData = JSON.parse(message);
	var writer = csvWriter({sendHeaders: false})
	writer.pipe(fs.createWriteStream('file.csv',{ 'flags': 'a'}))
	writer.write(myData)
	writer.end()
  }
})