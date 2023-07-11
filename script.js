// Searching html tags
var search = document.getElementById("search");
let find = document.getElementById("find");
let history = document.getElementById("history");
let item = document.getElementsByClassName("item");

// Day1 html tags
let today = document.getElementById("today");
let today_img = document.getElementById("today_img");
let today_wind = document.getElementById("today_wind");
let today_temp = document.getElementById("today_temp");
let today_humidity = document.getElementById("today_humidity");

// Day2 html tags
let next1 = document.getElementById("next1");
let next1_img = document.getElementById("next1_img");
let next1_wind = document.getElementById("next1_wind");
let next1_temp = document.getElementById("next1_temp");
let next1_humidity = document.getElementById("next1_humidity");

// Day3 html tags
let next2 = document.getElementById("next2");
let next2_img = document.getElementById("next2_img");
let next2_wind = document.getElementById("next2_wind");
let next2_temp = document.getElementById("next2_temp");
let next2_humidity = document.getElementById("next2_humidity");

// Day4 html tags
let next3 = document.getElementById("next3");
let next3_img = document.getElementById("next3_img");
let next3_wind = document.getElementById("next3_wind");
let next3_temp = document.getElementById("next3_temp");
let next3_humidity = document.getElementById("next3_humidity");

// Day5 html tags
let next4 = document.getElementById("next4");
let next4_img = document.getElementById("next4_img");
let next4_wind = document.getElementById("next4_wind");
let next4_temp = document.getElementById("next4_temp");
let next4_humidity = document.getElementById("next4_humidity");

// Chekc to see if local storage called items
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

// Renders everything in local storage
for (let i = 0; i < itemsArray.length; i ++) {
    let button = document.createElement("button");
    button.textContent = itemsArray[i];
    history.append(button);
}

async function get_weather_api(lat, lon) {
    // Weather API for 5 days
    let weather_api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&appid=2b065f015a232e6c602da803465fdae9&units=metric`
    const response = await fetch(weather_api);
    const information = await response.json();

    // Day1 set textContent
    today_img.textContent = "Date: " + information.list[4].dt_txt;
    today_wind.textContent = "Wind: " + information.list[4].wind.speed + "MPH";
    today_temp.textContent = "Temp: " + information.list[4].main.temp + "^C";
    today_humidity.textContent = "Humidity: " + information.list[4].main.humidity + "%";

    // Day2 set textContent
    next1_img.textContent = "Date: " + information.list[12].dt_txt;
    next1_wind.textContent = "Wind: " + information.list[12].wind.speed + "MPH";
    next1_temp.textContent = "Temp: " + information.list[12].main.temp + "^C";
    next1_humidity.textContent = "Humidity: " + information.list[12].main.humidity + "%";

    // Day3 set textContent
    next2_img.textContent = "Date: " + information.list[20].dt_txt;
    next2_wind.textContent = "Wind: " + information.list[20].wind.speed + "MPH";
    next2_temp.textContent = "Temp: " + information.list[20].main.temp + "^C";
    next2_humidity.textContent = "Humidity: " + information.list[20].main.humidity + "%";

    // Day4 set textContent
    next3_img.textContent = "Date: " + information.list[28].dt_txt;
    next3_wind.textContent = "Wind: " + information.list[28].wind.speed + "MPH";
    next3_temp.textContent = "Temp: " + information.list[28].main.temp + "^C";
    next3_humidity.textContent = "Humidity: " + information.list[28].main.humidity + "%";

    // Day5 set textContent
    next4_img.textContent = "Date: " + information.list[36].dt_txt;
    next4_wind.textContent = "Wind: " + information.list[36].wind.speed + "MPH";
    next4_temp.textContent = "Temp: " + information.list[36].main.temp + "^C";
    next4_humidity.textContent = "Humidity: " + information.list[36].main.humidity + "%"
}

async function get_location_api() {
    // Gets the lat and lon
    let location_api = `http://api.openweathermap.org/geo/1.0/direct?q=${search.value}&limit=5&appid=2b065f015a232e6c602da803465fdae9`
    const response = await fetch(location_api);
    const information = await response.json();
    let city = information[0].name;
    // Change to 2 decimal places
    let lat = parseFloat(information[0].lat).toFixed(2);
    let lon = parseFloat(information[0].lon).toFixed(2);
    itemsArray.push(city);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    // Set text content
    today.textContent = city;
    next1.textContent = city;
    next2.textContent = city;
    next3.textContent = city;
    next4.textContent = city;
    get_weather_api(lat, lon);
    let button = document.createElement("button");
    button.textContent = city;
    history.append(button);
}

// Search weather event listener
find.addEventListener("click", function(event) {
    event.preventDefault();
    get_location_api();
})

// History event listener
history.addEventListener("click", function(event) {
    event.preventDefault();
    search.value = event.target.textContent;
}) 



