// Declare Variables
var citySearchInput = document.getElementById("city-search-input");
var citySearchBtn = document.getElementById("city-search-btn");
var currentWeather = document.getElementById("current-weather");
var todaysDate = moment().format("dddd, MMMM Do gggg")

// Get localStorage items and display to Previous Searches??


// City Search button, search weather for entered city
citySearchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    citySearchInput = document.querySelector("#city-search-input").value;
    console.log(citySearchInput);
    callWeatherAPI();
});

// Get weather data from OpenWeatherMap API
function callWeatherAPI() {
    // OpenWeatherMap API key
    var apiKey = "d29d008cc6758b9c3331c9b67c570a62"

    // User response variables??
    

    // OpenWeatherMap - Current Weather Data API
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchInput + ",us&appid=" + apiKey + "&units=imperial";
    
    // AJAX call for Current Weather Data
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(queryURL);
        console.log(response);

        // Variables to grab weather icon for given search location
        var iconCode = response.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        // console.log(iconCode);
        
        // Display Current Weather Data response to page
        $(".city").html("<h4>" + response.name + " (" + todaysDate + ") " + "<img src='" + iconUrl + "'>" + "</h4>");
        $(".temperature").html("Temperature: " + response.main.temp + " &deg;F");
        $(".humidity").text("Humidity: " + response.main.humidity + " %");
        $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
        
        // Varables to grab Latitude & longitude for given search location - pulled from Current Weather Data to use with UV Index call
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        console.log(latitude);
        console.log(longitude);
        
        // OpenWeatherMap - One Call API
        var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&appid=" + apiKey + "&units=imperial";
        
        // AJAX call for One Call
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function(response2) {
            console.log(queryURL2);
            console.log(response2);

            // Variable to grab UV Index for given search location
            var uvCondition = response2.current.uvi;

            // Display UV Index response to page
            $(".uv-index-text").html(`UV Index: <span id="uv-index">${uvCondition}</span>`);

            // Variable for controlling UV Index condition color
            var uvIndex = document.getElementById("uv-index");
            
            // UV Index color conditions
            if(uvCondition <= 2) {
                uvIndex.setAttribute("class", "favorable");
            } else if (uvCondition >= 8) {
                uvIndex.setAttribute("class", "severe");
            } else {
                uvIndex.setAttribute("class", "moderate");
            }

            // OpenWeatherMap API - 5-Day Forecast
            // var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearchInput + "&appid=" + apiKey + "&units=imperial";
            
            // // AJAX call for 5-Day Forecast
            // $.ajax({
            //     url: queryURL3,
            //     method: "GET"
            // }).then(function(responseFiveDay) {
            //     console.log(queryURL3);
            //     console.log(responseFiveDay);


            // })
        })
        
    })
}



// Need to add in API for 5-day forecast down here