// Declare Variables
var citySearchInput = document.getElementById("city-search-input");
var citySearchBtn = document.getElementById("city-search-btn");
// var hideList = document.getElementById("hide-list");
var currentWeather = document.getElementById("current-weather");
var todaysDate = moment().format("dddd, MMMM Do gggg")

// Get localStorage items and display to Previous Searches


// City Search button, search weather for entered city
citySearchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    citySearchInput = document.querySelector("#city-search-input").value;
    console.log(citySearchInput);
    // hideList.setAttribute("class", "show");
    callWeatherAPI();
});

// Get weather data from OpenWeatherMap API
function callWeatherAPI() {
    // OpenWeatherMap API key
    var apiKey = "d29d008cc6758b9c3331c9b67c570a62"

    // User response variables
    

    // OpenWeatherMap API - Current Weather Data
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchInput + "&appid=" + apiKey + "&units=imperial";
    
    // AJAX call for Current Weather Data
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(queryURL);
        console.log(response);
        
        // Display Current Weather Data response to page
        $(".city").html("<h2>" + response.name + " (" + todaysDate + ")" + "</h2>"); // Need to add date code into this block
        $(".temperature").html("Temperature: " + response.main.temp + " &deg;F");
        $(".humidity").text("Humidity: " + response.main.humidity + " %");
        $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
        
        // Latitude & longitude variables - pulled from Current Weather Data to use with UV Index call
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        console.log(latitude);
        console.log(longitude);
        
        // OpenWeatherMap API - UV Index
        // var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
        var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&appid=" + apiKey + "&units=imperial";
        
        // AJAX call for UV Index
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function(responseUV) {
            console.log(queryURL2);
            console.log(responseUV);
            $(".uv-index").text("UV Index: " + responseUV.current.uvi);

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




// Need to add in API for UV Index down here

// Need to add in API for 5-day forecast down here