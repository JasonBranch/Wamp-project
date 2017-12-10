# Wamp project
Weather led control project. 

improtant files:
index.html
WsServer.js (from Tom Igoe tutorial reading serial data in browser) https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-communication-with-node-js/
sketch.js



Files: 
index.html : input button for location "New York" "Miami" etc.
This file currently works with sketch.js to visualize weather and color based on weather using p5.




WsServer is a file that sets up a websocket to see arduino data in the browser.
run WsServer in terminal using node "wsServer.js portname" to see arduino data in browser.
If testing this delete or comment out code below var = weather;
WsServer use web socket to set up a server at port 8081.




WsServer.js file has sketch.js file in it also beginning at



// =================================================
// new color send 
// =================================================

Sketch.js : p5 code calling api for current weather and changing color based on temperature




Currently can only link one js file to index.html either sketch or WsServer
