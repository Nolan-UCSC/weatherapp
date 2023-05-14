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


app.get('/weather/:lat/:lon', (req, res) => {
  res.send('Hello World!');
  console.log("welcome to the root!");
  
  var lat = req.params.lat; // New Code
  var lon = req.params.lon; // New Code
  var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`

  
	request(url, (error, response, body)=>{
		
		// Printing the error if occurred
		if(error) console.log(error)
	   
		// Printing status code
		console.log(response.statusCode);
		 
		// Printing body
		body = JSON.parse(body)
		console.log(body.main.temp);
	});
  
});
