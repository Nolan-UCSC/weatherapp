// Create the variable for latitude
let latitude = 0;
// Create the variable for longitude
let longitude = 0;

window.onload = function() {
    const date = new Date();
    const dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    // Now, set the .date HTML text to our dateString
    document.getElementById('date').innerHTML = dateString;
    if ("geolocation" in navigator) { //if location supported then
		navigator.geolocation.getCurrentPosition(success) //get pos and calls success

	} else { //if location does not exist or denied then
	  console.log("Geolocation is not available in your browser.");
	}    
}
function success(position){
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
    console.log(latitude, " ", longitude);
	// Print out the latitude and longitude to see if it works!
    
}

const btn = document.getElementById('getWeatherBtn');
btn.addEventListener("click", function() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:3000/weather/${lat}/${lon}`); 
  xhr.send();

  xhr.onload = function() {
    const body = JSON.parse(xhr.responseText)
	  var temperature = body.temperature
	  var weatherStatus = body.weatherStatus
	  document.getElementById('temperature').innerHTML = `Temperature: ${temperature} \u00B0F F`
    document.getElementById('weatherStatus').innerHTML = `Weather Status: ${weatherStatus}`


  }

  //-------------------- FORCAST --------------------\\

  var temp = 59
  var location = "Santa Cruz"
  var helloString = `In ${location} it is ${temp} Degrees`
  console.log(helloString) // Output: In Santa Cruz it is 59 Degrees

  const xhr2 = new XMLHttpRequest();
  xhr2.open("GET", `http://localhost:3000/weather/${lat}/${lon}`);
  xhr2.send();
  
  xhr2.onload = function() {
    const body = JSON.parse(xhr2.responseText)
    var forecast = body.forecast //Remember: this is a list
    var forecastElements = document.getElementsByClassName("forecast");
    for (var i = 0; i < forecast.length; i++) {
      forecastElements[i].innerHTML = `${forecast[i].dayName}: ${forecast[i].temp} \u00B0F F`;
  }
  }

  
  





  let forecast = [["M", 52], ["Tu", 53], ["W", 54], ["Th", 55], ["F", 56]]
  let forecastElements = document.getElementsByClassName("forecast");
  for (let i = 0; i < forecast.length; i++) {
      forecastElements[i].innerHTML = forecast[i][0] + ": " + forecast[i][1] + "\u00B0F";
  }
});

const express = require('express');
const request = require("request");
const cors = require('cors');

const app = express();

app.use(cors());

const API_KEY = "91256a0530b9b02ca05a2233a7608072"; 


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/date', (req, res) => {
  const date = new Date();
  const dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
  res.send(dateString);
});

app.get('/temperature', (req, res) => {
  const temperature = 72; // sample data
  res.send(temperature + '°F');
});

app.get("/weather/:latitude/:longitude", (req, res) => {
  const lat = req.params.latitude;
  const lon = req.params.longitude;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

  request(weatherUrl, (error, response, body) => {
    if (error) {
      return res.status(500).send("Error retrieving weather information.");
    }

    const weatherData = JSON.parse(body);
    const temperature = weatherData.main.temp;
    const weatherStatus = weatherData.weather[0].main;

    res.send({ temperature, weatherStatus });
  });
});

app.get('/weather/forecast/:lat/:lon', (req, res) => {
  const lat = req.params.lat;
  const lon = req.params.lon;
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

  request(url, (err, response, body) => {
    if (err) {
      res.status(500).send({ error: 'Something went wrong' });
    } else {
      const data = JSON.parse(body);
      const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const forecast = [];
      let currentDay = new Date().getDay();

      for (let i = 0; i < 5; i++) {
        let tempSum = 0;
        let count = 0;

        for (let dataPoint of body.list){
          const date = new Date(dataPoint.dt * 1000);
          if (date.getDay() === currentDay) {
            tempSum += dataPoint.main.temp;
            count++;
          }
        }

        const day = {
          dayName: week[currentDay],
          temp: Math.round(tempSum / count),
        };
        forecast.push(day);
        currentDay = (currentDay + 1) % 7;
      }

      res.send(forecast);
    }
  });
});
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});



