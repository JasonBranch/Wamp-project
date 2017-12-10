import { Meteor } from 'meteor/meteor';
import Led from '../imports/api/led.js'
import { connect } from 'mqtt/lib/connect';
import SerialPort from 'serialport';


 // display array -> can be sent to arduino
  let ledPixels = [];

const Readline = SerialPort.parsers.Readline;
const parser = new Readline();
var port = new SerialPort('/dev/cu.usbmodem641', {
  baudRate: 9600
});
port.pipe(parser);

// parse the data from serial into meaningful objects
function onData(data) {
  console.log(data);
  // send the character over mqtt
  // client.publish("led", text);
}

// our callback function must be wrapped in Meteor.bindEnvironment to avoid Fiber errors
parser.on('data', Meteor.bindEnvironment(onData));

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

function writeSerialData(data) {

  port.write(data, function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('wrote', data);
  });

}


Meteor.methods({
  'serial.write'(pixels) {
    
    for (var i = 0, len = pixels.length; i < len; i++) {
      var pixelStr = "";
      pixelStr += pixels[i].r + ",";
      pixelStr += pixels[i].g + ",";
      pixelStr += pixels[i].b + "|"
      writeSerialData(pixelStr);

    }
    writeSerialData('/r');
    
  }
})



// =================================================
// Get Weather Color to arduino // Server side ?
// =================================================

$.getJSON(api_call, function showweathercolor(day){

	this.r = 0;
    this.g = 0;
    this.b = 0;

	var apiKey       = '2b279c1401ac15284aa23237cb6606f3',
			url          = 'https://api.darksky.net/forecast/',
			lati         = latitude,
			longi        = longitude,
			api_call     = url + apiKey + "/" + lati + "," + longi + "?extend=hourly&callback=?";


		// Loop thru hourly forecasts for arduino color change
		for(var i = 0, l = forecast.daily.data.length; i < l - 1; i++) {

			var date     = new Date(forecast.daily.data[i].time * 1000),
					day      = days[date.getDay()],
					temp    = Math.round(forecast.hourly.data[i].temperature),
					tempMax = Math.round(forecast.daily.data[i].temperatureMax);
					writeSerialData();
//send as hex value
					if (temp =< 10){ this.r = 0; this.g = 0; this.b = 0;}
					else (temp =< 20){ this.r = 0; this.g = 0; this.b = 0;}
					else (temp =< 30){ this.r = 0; this.g = 0; this.b = 0;}
					else (temp =< 40){ this.r = 0; this.g = 0; this.b = 0;}
					else (temp =< 50){ this.r = 0; this.g = 0; this.b = 0;}
					else (temp =< 60){ this.r = 0; this.g = 0; this.b = 0;}
					else (temp =< 70){ this.r = 0; this.g = 0; this.b = 0;}
					else (temp =< 80){ this.r = 0; this.g = 0; this.b = 0;}
					else (temp =< 90){ this.r = 0; this.g = 0; this.b = 0;}
					else (temp =< 100){ this.r = 0; this.g = 0; this.b = 0;}



}

// =================================================
// End server side ??
// =================================================


// =================================================
// LED PIXEL PUSH TO ARDUINO/HARDWARE
// =================================================


  function calculateDownsample() {
    // takes the pixels from the output buffer
    // and downsamples them to be displayed on our LED matrix

    ouputBuffer.loadPixels(); // load the pixels

    // loop through
    for (var x = 0; x < 8; x++) {
      for (var y = 0; y < 5; y++) {
        var index = (x*vScale + 1 + (y*vScale * 160))*4;
        var r = ouputBuffer.pixels[index+0];
        var g = ouputBuffer.pixels[index+1];
        var b = ouputBuffer.pixels[index+2];

        // this value is the 1 demensional index in the 8 * 5 loop
        // they should calculate sequentially 1,2,3 etc...
        var value = x + y * 8;
        
        // this is our array
        ledPixels[value].r = r;
        ledPixels[value].g = g;
        ledPixels[value].b = b;
        ledPixels[value].index = value; // -> this to the display
        ledPixels[value].x = 200 + x*vScale; // vScale is the size of the blocks (20px)
        ledPixels[value].y = 400 + y*vScale;
        ledPixels[value].display(); // display renders downsampled pixels at their x,y location

        // TODO: add send to display method
        // this is not written yet but should basically accept
        // an array of values and map them to the pixels on the arduino

        // - might have to be an index,r,g,b for each pixel to have color
        // display.render(ledPixels);
        
        p5.noStroke();
        
        // INTERACTIVE
        // loop throught he pixels and calculate which ones are to be masked
        if (ledPixels[value].toggle) { // if that particular pixel is toggeled
          if (drawBool) { // is drawing mask enabled?
            p5.fill(255,255,255,255)
          } else {
            p5.fill(r,g,b);
          }
        } else {
          p5.fill(r,g,b);
        }

        // this is the final value of the pixel (final result)
        p5.rect(400 + x*vScale, 400 + y*vScale, 20, 20);
      }
    }
  }

// =================================================
// LED PIXEL PUSH TO ARDUINO/HARDWARE END
// =================================================

// =================================================
// API DECLARATION/HEAVY LIFTING, CLIENT SIDE JS?
// =================================================

function staggerFade() {
	setTimeout(function() {
		$('.fadein-stagger > *').each(function() {
			$(this).addClass('js-animated');
		})
	}, 30);
}


function weatherReport(latitude, longitude) {
	// variables config for coordinates, url and api key
	// latitude and longitude are accepted arguments and passed
	// once a user has submitted the form.
	var apiKey       = '2b279c1401ac15284aa23237cb6606f3',
			url          = 'https://api.darksky.net/forecast/',
			lati         = latitude,
			longi        = longitude,
			api_call     = url + apiKey + "/" + lati + "," + longi + "?extend=hourly&callback=?";

	// Hold our days of the week for reference later.
	var days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];

	// Hold hourly values for each day of the week.
	// This will store our 24 hour forecast results.
	var sunday    = [],
			monday    = [],
			tuesday   = [],
			wednesday = [],
			thursday  = [],
			friday    = [],
			saturday  = [];



	// Hourly report method to reference in our daily loop
	function hourlyReport(day, selector) {
		for(var i = 0, l = day.length; i < l; i++) {
			$("." + selector + " " + "ul").append('<li>' + Math.round(day[i]) + '</li>');
		}
	}

	// Call to the DarkSky API to retrieve JSON
	$.getJSON(api_call, function(forecast) {

		// Loop thru hourly forecasts
		for(var j = 0, k = forecast.hourly.data.length; j < k; j++) {
			var hourly_date    = new Date(forecast.hourly.data[j].time * 1000),
					hourly_day     = days[hourly_date.getDay()],
					hourly_temp    = forecast.hourly.data[j].temperature;

			

			// push 24 hour forecast values to our empty days array
			switch(hourly_day) {
				case 'Sunday':
					sunday.push(hourly_temp);
					break;
				case 'Monday':
					monday.push(hourly_temp);
					break;
				case 'Tuesday':
					tuesday.push(hourly_temp);
					break;
				case 'Wednesday':
					wednesday.push(hourly_temp);
					break;
				case 'Thursday':
					thursday.push(hourly_temp);
					break;
				case 'Friday':
					friday.push(hourly_temp);
					break;
				case 'Saturday':
					saturday.push(hourly_temp);
					break;
				default: console.log(hourly_date.toLocaleTimeString());
					break;
			}
		}

		// Loop thru daily forecasts
		for(var i = 0, l = forecast.daily.data.length; i < l - 1; i++) {

			var date     = new Date(forecast.daily.data[i].time * 1000),
					day      = days[date.getDay()],
					skicons  = forecast.daily.data[i].icon,
					time     = forecast.daily.data[i].time,
					humidity = forecast.daily.data[i].humidity,
					summary  = forecast.daily.data[i].summary,
					temp    = Math.round(forecast.hourly.data[i].temperature),
					tempMax = Math.round(forecast.daily.data[i].temperatureMax);

			

			// Append Markup for each Forecast of the 7 day week
			$("#forecast").append(
				'<li class="shade-'+ skicons +'"><div class="card-container"><div><div class="front card"><div>' +
					"<div class='graphic'><canvas class=" + skicons + "></canvas></div>" +
					"<div><b>Day</b>: " + date.toLocaleDateString() + "</div>" +
					"<div><b>Temperature</b>: " + temp + "</div>" +
					"<div><b>Max Temp.</b>: " + tempMax + "</div>" +
					"<div><b>Humidity</b>: " + humidity + "</div>" +
					'<p class="summary">' + summary + '</p>' +
					'</div></div><div class="back card">' +
					'<div class="hourly' + ' ' + day + '"><b>24hr Forecast</b><ul class="list-reset"></ul></div></div></div></div></li>'
			);

			// Daily forecast report for each day of the week
			switch(day) {
				case 'Sunday':
					hourlyReport(sunday, days[0]);
					break;
				case 'Monday':
					hourlyReport(monday, days[1]);
					break;
				case 'Tuesday':
					hourlyReport(tuesday, days[2]);
					break;
				case 'Wednesday':
					hourlyReport(wednesday, days[3]);
					break;
				case 'Thursday':
					hourlyReport(thursday, days[4]);
					break;
				case 'Friday':
					hourlyReport(friday, days[5]);
					break;
				case 'Saturday':
					hourlyReport(saturday, days[6]);
					break;
			}
		}

		staggerFade(); // fade-in forecast cards in a stagger-esque fashion

	});
}


// =================================================
// Get Weather Button Event
// =================================================

// Get Weather Button Event
$('button').on('click', function(e) {
	var lat       = $('#latitude').val(),
			long      = $('#longitude').val(),
			city_name = $('#city-search').val()

	// If the latitude and longitude inputs aren't empty
	// then continue with the code. Otherwise report error to user.
	if(lat && long !== '') {
		e.preventDefault();

		

		// Fade the form out, submit the weather request,
		// inject "new forecast" button, city name & forecast cards.
		$('.form').fadeOut(100, function() {
			weatherReport(lat, long);
			$('.screen').append('<button id="back">New Forecast</button><h3 class="city">' + city_name + '</h3><ul class="list-reset fadein-stagger" id="forecast"></ul>');
		});
	}
});


// "new forecast" button. Allow user
// to return to forecast form.
$('body').on('click', '#back', function() {
	window.location.reload(true);
})


// =================================================
// Report City & AutoFill Coords
// =================================================
// KEY AIzaSyCsri7Uoq7OMImitXRbM8AKxAjO_crB1G8

function insertGoogleScript() {
	var google_api = document.createElement('script'),
			api_key    = 'AIzaSyCsri7Uoq7OMImitXRbM8AKxAjO_crB1G8';

	// Inject the script for Google's API and reference the initGoogleAPI
	// function as a callback.
	google_api.src = 'https://maps.googleapis.com/maps/api/js?key='+ api_key +'&callback=initGoogleAPI&libraries=places,geometry';
	document.body.appendChild(google_api);
}


// SearchBox Method
function initGoogleAPI() {
	var autocomplete = new google.maps.places.SearchBox(document.querySelector("#city-search"));

	autocomplete.addListener('places_changed', function() {
		var place = autocomplete.getPlaces()[0];
		document.querySelector("#latitude").value = place.geometry.location.lat();
		document.querySelector("#longitude").value = place.geometry.location.lng();
	});
}

insertGoogleScript();
















<div class="idk">
			

			<!-- VISUAL DESKTOP -->
			<div class="screen">
				<div alt="Jasons Broken app" id="logo"></div>
				<form method="get" class="form">
					<fieldset>
						<legend>Input your city</legend>
						<ul class="list-reset">
							<li class="form-field">
								<label for="city-search">City Name</label>
								<input type="text" id="city-search" placeholder="e.g. Brooklyn, NY">
							</li>

							<li class="form-field">
								<label for="latitude">Latitude</label>
								<input type="text" id="latitude" placeholder="e.g. 40.6781784" required>
							</li>

							<li class="form-field">
								<label for="longitude">Longitude</label>
								<input type="text" id="longitude" placeholder="e.g. -73.9441579" required>
							</li>

						</ul>
					</fieldset>

					<button>Get Weather</button>
				</form>
			</div> 
</div> 
