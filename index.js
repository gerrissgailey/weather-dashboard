// Declare Variables
var citySearchInput = document.getElementById("city-search-input");
var citySearchBtn = document.getElementById("city-search-btn");

// Get localStorage items and display to Previous Searches


// City Search button, search weather for entered city
citySearchBtn.addEventListener("click", function (event) {
    event.preventDefault();

});

// Get weather data from OpenWeatherMap API
function callWeatherAPI() {
    // OpenWeatherMap API key
    var apiKey = "d29d008cc6758b9c3331c9b67c570a62"

    // User response variables
    // var cityQuery = citySearchInput;


    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + citySearchInput + "&appid=" + apiKey;

    // AJAX call OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // Display weather API response to results page
        document.getElementById("current-weather").textContent = citySearchInput + " Weather";
        
    })
}