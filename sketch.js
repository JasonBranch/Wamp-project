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
			ellipse(weather.main.temp,weather.main.temp_max, weather.main.temp, weather.main.temp_max);}
			else if

			
				((temp > 20)&&(temp < 30)){ code = color(188, 188, 188);
			fill(c);
			ellipse(weather.main.temp,weather.main.temp_max, weather.main.temp, weather.main.temp_max);}
			else if

				((temp > 30)&&(temp < 40)){ code = color(255, 255, 255);
			fill(code);
			ellipse(weather.main.temp,weather.main.temp_max, weather.main.temp, weather.main.temp_max);}
			else if

			((temp > 40)&&(temp < 50)){ code = color(66, 134, 24);
			fill(code);
			ellipse(weather.main.temp,weather.main.temp_max, weather.main.temp, weather.main.temp_max);}
			else if
				((temp > 50)&&(temp < 60)){ code = color(148, 255, 24);
			fill(code);
			ellipse(weather.main.temp,weather.main.temp_max, weather.main.temp, weather.main.temp_max);}
			else if

				((temp > 60)&&(temp < 70)){ code = color(255, 225, 0);
			fill(code);
			ellipse(weather.main.temp,weather.main.temp_max, weather.main.temp, weather.main.temp_max);}
			else if

				((temp > 80)&&(temp < 90)){ code = color(255, 165, 0);
			fill(code);
			ellipse(weather.main.temp,weather.main.temp_max, weather.main.temp, weather.main.temp_max);}
			else if

				((temp > 90)&&(temp < 100)){ code = color(255, 72, 0);
			fill(code);
			ellipse(weather.main.temp,weather.main.temp_max, weather.main.temp, weather.main.temp_max);}
			else if

				(temp > 100){ code = color(255, 0, 0);
			fill(code);
			ellipse(weather.main.temp,weather.main.temp_max, weather.main.temp, weather.main.temp_max);}
			else

	rect(10,100, weather.main.temp, weather.main.temp);


}
	}




		