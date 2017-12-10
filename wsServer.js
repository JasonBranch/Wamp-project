/*
Serial-to-websocket Server
using serialport.js
To call this type the following on the command line:
node wsServer.js portName
where portname is the name of your serial port, e.g. /dev/tty.usbserial-xxxx (on OSX)
created 28 Aug 2015
modified 5 Nov 2017
by Tom Igoe
*/

// include the various libraries that you'll use:
var SerialPort = require('serialport');			// include the serialport library
var	portName =  process.argv[2];						// get the port name from the command line
var WebSocketServer = require('ws').Server;   // include the webSocket library

// configure the webSocket server:
var SERVER_PORT = 8081;                 // port number for the webSocket server
var wss = new WebSocketServer({port: SERVER_PORT}); // the webSocket server
var connections = new Array;            // list of connections to the server

var myPort = new SerialPort(portName, 9600);// open the port
var Readline = SerialPort.parsers.Readline;	// make instance of Readline parser
var parser = new Readline();								// make a new parser to read ASCII lines
myPort.pipe(parser);													// pipe the serial stream to the parser

// these are the definitions for the serial events:
myPort.on('open', showPortOpen);    // called when the serial port opens
myPort.on('close', showPortClose);  // called when the serial port closes
myPort.on('error', showError);   // called when there's an error with the serial port
parser.on('data', readSerialData);  // called when there's new data incoming


// ------------------------ Serial event functions:
// this is called when the serial port is opened:
function showPortOpen() {
  console.log('port open. Data rate: ' + myPort.baudRate);
}

// this is called when new data comes into the serial port:
function readSerialData(data) {
  // if there are webSocket connections, send the serial data
  // to all of them:
  console.log(data);
  if (connections.length > 0) {
    broadcast(data);
  }
}

function showPortClose() {
   console.log('port closed.');
}
// this is called when the serial port has an error:
function showError(error) {
  console.log('Serial port error: ' + error);
}

function sendToSerial(data) {
  console.log("sending to serial: " + data);
  myPort.write(data);
}

// ------------------------ webSocket Server event functions
wss.on('connection', handleConnection);

function handleConnection(client) {
  console.log("New Connection");        // you have a new client
  connections.push(client);             // add this client to the connections array

  client.on('message', sendToSerial);      // when a client sends a message,

  client.on('close', function() {           // when a client closes its connection
    console.log("connection closed");       // print it out
    var position = connections.indexOf(client); // get the client's position in the array
    connections.splice(position, 1);        // and delete it from the array
  });
}
// This function broadcasts messages to all webSocket clients
function broadcast(data) {
  for (c in connections) {     // iterate over the array of connections
    connections[c].send(JSON.stringify(data)); // send the data to each connection
  }
}

  // =================================================
// new color send 
// =================================================


var weather;
var api ='http://api.openweathermap.org/data/2.5/weather?q=';
var apiKey = '&APPID=94d3709c084c43538e29b507be79f40c';
var units = '&units=imperial';
var input;
var code; // color for leds
var serial; //variable to hold instance of serial port
var fromSerial = 0; //variable to hold data

// 94d3709c084c43538e29b507be79f40c api key
// sample api access url:  api.openweathermap.org/data/2.5/weather?q=London&units=imperial&APPID=94d3709c084c43538e29b507be79f40c
// specify units in api key, current kelvin get farenheit
//added units=imperial


function setup() {
  createCanvas(400, 200);


  var button =select('#submit');
  button.mousePressed(weatherAsk);
  console.log('working weather');

  input = select('#city');
} 

  function weatherAsk(){
  var url = api + input.value() + apiKey + units;
  loadJSON(url, gotData);
  

}


function gotData(info) {
  //println(data);

  weather = info;
}

function draw() {

   background(0);
   if (weather) {

    var temp = weather.main.temp;
    var humidity = weather.main.humidity;

    if (temp < 10){var code= color(0, 0, 0);
      fill(code);
      ellipse(weather.main.temp,weather.main.temp_max, weather.main.temp, weather.main.temp_max);
    console.log('code');}
      
      else if

      
        ((temp > 20)&&(temp < 30)){ code = color('#bcbcbc');
      fill(c);
      ellipse(weather.main.temp,weather.main.temp_max, weather.main.temp, weather.main.temp_max);
    console.log('code');}
      else if

        ((temp > 30)&&(temp < 40)){ code =  color('#ffffff');
      fill(code);
      ellipse(weather.main.temp,weather.main.temp_max, weather.main.temp, weather.main.temp_max);
    console.log('code');}
      else if

      ((temp > 40)&&(temp < 50)){ code =  color('#428618');
      fill(code);
      ellipse(weather.main.temp,weather.main.temp_max, weather.main.temp, weather.main.temp_max);console.log('code');
    }
      else if
        ((temp > 50)&&(temp < 60)){ code =  color('#94ff18');
      fill(code);
      ellipse(weather.main.temp,weather.main.temp_max, weather.main.temp, weather.main.temp_max);
    console.log('code');}
      else if

        ((temp > 60)&&(temp < 70)){ code = color('#ffe100');
      fill(code);
      ellipse(weather.main.temp,weather.main.temp_max, weather.main.temp, weather.main.temp_max);
    console.log('code');}
      else if

        ((temp > 80)&&(temp < 90)){ code =  color('#ffa500');
      fill(code);
      ellipse(weather.main.temp,weather.main.temp_max, weather.main.temp, weather.main.temp_max);
    console.log('code');}
      else if

        ((temp > 90)&&(temp < 100)){ code = color('#ff4800');
      fill(code);
      ellipse(weather.main.temp,weather.main.temp_max, weather.main.temp, weather.main.temp_max);
    console.log('code');}
      else if

        (temp > 100){ code =  color('#ff0000');
      fill(code);
      ellipse(weather.main.temp,weather.main.temp_max, weather.main.temp, weather.main.temp_max);
    console.log('code');}
      else

  rect(10,100, weather.main.temp, weather.main.temp);



}
  }


//  ellipse(10,100, weather.main.temp, weather.main.temp);
// ellipse(200,100, weather.main.humidity, weather.main.humidity);

