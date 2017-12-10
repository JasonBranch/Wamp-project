# Wamp project
Weather led control project. 

improtant files:
index.html
WsServer.js (from Tom Igoe tutorial reading serial data in browser) https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-communication-with-node-js/
sketch.js

Files: index.html : input button for location "New York" "Miami" etc

run WsServer in terminal using node "wsServer.js portname" to see arduino data in browser

Currently can only link one js file to index.html either sketch or WsServer


WsServer.js file has sketch.js file in it also beginning at 
// =================================================
// new color send 
// =================================================
Sketch.js : p5 code calling api for current weather and changing color based on temperature
