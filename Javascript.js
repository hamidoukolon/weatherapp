var apiKey = "1efb7ad15ee6ff53d1112444eb8e3eb0";
// search button on click WEATHER
$("#search").on('click', function () {
    $("#5dayForecast").empty();
    event.preventDefault();

    var cityInput = $("#cityInput").val();
    var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=imperial&APPID=" + apiKey;
    // Call the weather API  - Forecast
    $.ajax({
        url: weatherURL,
        method: "GET"

        
    }).then(function (response) {
        var UVURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&APPID=" + apiKey;

        $.ajax({
            url: UVURL,
            method: "GET"
        }).then(function (data) {
            var lon = data.coord.lon
            var lat = data.coord.lat
            console.log(lat, lon)

            

            // // Call the weather API  - UV

            var uvURL = `http://api.openweathermap.org/data/2.5/uvi/forecast?APPID=${apiKey}&lat=${lat}&lon=${lon}`


            console.log("long");

            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (UVresponse) {
                console.log(UVresponse)

                console.log(response);
                console.log(uvURL);



                var temperature = response.list[0].main.temp
        var humidity = response.list[0].main.humidity
        var windspeed = response.list[0].wind.speed
        var rain = response.list[0].rain["3h"]
        var UVindex = response.list[0].value

        $(".currenttemp").text(temperature)
        $(".currenthum").text(humidity)
        $(".currentwind").text(windspeed)
        $(".currentUV").text(formattedRainPercentage)

        for (var i = 0; i < response.list.length; i++) {
            var time = response.list[i].dt_txt.split(" ")[1]
            if (time === "12:00:00") {

                console.log(response.list[i])
                MakDayCard(response.list[i])
            }
        }
        
        function MakDayCard(day) {

            var colDiv = $("<div>").addClass("col-2")
            var card = $("<div>").addClass("card")
            var cardBody = $("<div>").addClass("card-body")
            var date = $("<h5>").addClass("card-title date").text("Date: ")
            var dateSpan = $("<span>").text(day.dt_txt)
            date.append(dateSpan);
            var icon = $("<p>").addClass("icon");
            var forecast = $("<p>").addClass("forecasttemp").text("Temperature: ")
            var tempSpan = $("<span>").text(day.main.temp)
            forecast.append(tempSpan)
            var humidity = $("<p>").addClass("forecasthum").text("Humidity: ")
            var humditySPan = $("<span>").text(day.main.humidity)
            humidity.append(humditySPan)
            cardBody.append(date, icon, forecast, humidity);
            card.append(cardBody)
            colDiv.append(card)
        
            $("#5dayForecast").append(colDiv)
        };
            });

        });

        // var temperature = response.list[0].main.temp
        // var humidity = response.list[0].main.humidity
        // var windspeed = response.list[0].wind.speed
        // var rain = response.list[0].rain["3h"]
        // var formattedRainPercentage = (rain * 100) + "%"

        // $(".currenttemp").text(temperature)
        // $(".currenthum").text(humidity)
        // $(".currentwind").text(windspeed)
        // $(".currentUV").text(formattedRainPercentage)

        for (var i = 0; i < response.list.length; i++) {
            var time = response.list[i].dt_txt.split(" ")[1]
            if (time === "12:00:00") {

                console.log(response.list[i])
                MakDayCard(response.list[i])
            }
        }
        console.log(response);
        console.log(weatherURL);

        
    });
});

function MakDayCard(day) {

    var colDiv = $("<div>").addClass("col-2")
    var card = $("<div>").addClass("card")
    var cardBody = $("<div>").addClass("card-body")
    var date = $("<h5>").addClass("card-title date").text("Date: ")
    var dateSpan = $("<span>").text(day.dt_txt)
    date.append(dateSpan);
    var icon = $("<p>").addClass("icon");
    var forecast = $("<p>").addClass("forecasttemp").text("Temperature: ")
    var tempSpan = $("<span>").text(day.main.temp)
    forecast.append(tempSpan)
    var humidity = $("<p>").addClass("forecasthum").text("Humidity: ")
    var humditySPan = $("<span>").text(day.main.humidity)
    humidity.append(humditySPan)
    cardBody.append(date, icon, forecast, humidity);
    card.append(cardBody)
    colDiv.append(card)

    $("#5dayForecast").append(colDiv)
};





// // city history to local storage.
// function storeCity(city) {
//     var currentCity = $('<li>').text(city);
//     currentCity.attr({ type: 'button', class: 'storeCity', name: city });
//     $('#cities').append(currentCity);
    
//     var citydata = JSON.parse(localStorage.getItem())
    
    
//     localStorage.setItem('city',JSON.stringify (city);
//     console.log("city")
    
//     });
