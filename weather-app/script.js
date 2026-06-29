const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "1042cabe38668fefa70a11d70bf4189d";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(url).then(response => response.json());

    if (weather_data.cod == "404") {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error: location not found");
        return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    // Update weather info
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}℃`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed} km/h`;

    const desc = weather_data.weather[0].description.toLowerCase();

    // ----- DAY / NIGHT MODE CHECK ----- //
    const sunrise = weather_data.sys.sunrise * 1000;
    const sunset = weather_data.sys.sunset * 1000;
    const currentTime = Date.now();

    let isDay = currentTime > sunrise && currentTime < sunset;

    if (isDay) {
        document.body.classList.add("day-mode");
        document.body.classList.remove("night-mode");
    } else {
        document.body.classList.add("night-mode");
        document.body.classList.remove("day-mode");
    }

    // ----- WEATHER ICON SELECTION (DAY/NIGHT) ----- //
    if (desc.includes("clear")) {
        weather_img.src = isDay ? "img/clear-day.png" : "img/clear-night.png";
    } 
    else if (desc.includes("cloud")) {
        weather_img.src = isDay ? "img/cloud-day.png" : "img/cloud-night.png";
    } 
    else if (desc.includes("rain")) {
        weather_img.src = isDay ? "img/rain-day.png" : "img/rain-night.png";
    } 
    else if (desc.includes("drizzle")) {
        weather_img.src = isDay ? "img/drizzle-day.png" : "img/drizzle-night.png";
    } 
    else if (desc.includes("thunder")) {
        weather_img.src = isDay ? "img/thunder-day.png" : "img/thunder-night.png";
    } 
    else if (desc.includes("snow")) {
        weather_img.src = isDay ? "img/snow-day.png" : "img/snow-night.png";
    } 
    else if (desc.includes("mist") || desc.includes("fog")) {
        weather_img.src = isDay ? "img/mist-day.png" : "img/mist-night.png";
    } 
    else if (desc.includes("haze")) {
        weather_img.src = isDay ? "img/haze-day.png" : "img/haze-night.png";
    } 
    else if (desc.includes("smoke")) {
        weather_img.src = isDay ? "img/smoke-day.png" : "img/smoke-night.png";
    } 
    else if (desc.includes("wind")) {
        weather_img.src = isDay ? "img/wind-day.png" : "img/wind-night.png";
    } 
    else {
        weather_img.src = isDay ? "img/default-day.png" : "img/default-night.png";
    }

    console.log(weather_data);
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});