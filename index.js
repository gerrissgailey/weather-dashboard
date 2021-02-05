// Declare Variables
var citySearchInput = document.getElementById("city-search-input");
var citySearchBtn = document.getElementById("city-search-btn");
var hideList = document.getElementById("hide-list");
var currentWeather = document.getElementById("current-weather");

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
    


    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchInput + "&appid=" + apiKey + "&units=imperial";
    // AJAX call OpenWeatherMap API
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(queryURL);
        console.log(response);
        // Display weather API response to results page
        // document.getElementById("current-weather").textContent = citySearchInput + " Weather";

        // API response variables
        $(".city").html("<h2>" + response.name + "</h2>"); // Need to add date code into this block
        $(".temperature").html("Temperature: " + response.main.temp + " &deg;F");
        $(".humidity").text("Humidity: " + response.main.humidity + " %");
        $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
        // $(".uv-index").text("UV Index: " + response.main.humidity);
        // var city
        // var temperature
        // var humidity
        // var windSpeed
        // var uvIndex
        
        // Need to add in API for UV Index down here

        // Need to add in API for 5-day forecast down here
    })
}
