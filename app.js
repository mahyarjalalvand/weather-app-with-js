const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEYS = "1de427fd7c85dc7ba2884dd9b8377662";
const searchInput = document.querySelector("input")
const searchButton = document.querySelector("button")
const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
const locationIcon = document.getElementById("location");

const getCurrentWeatherByName = async (city) => {
    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEYS}&units=metric`;
    const response = await fetch(url);
    const json = response.json()
    return json;
};
const getCurrentWeatherByCoordinates = async (lat, lon) => {
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEYS}&units=metric`;
    const response = await fetch(url);
    const json = response.json()
    return json;
};

const getForecastWeatherByName = async (city) => {
    const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEYS}&units=metric`;
    const response = await fetch(url);
    const json = response.json()
    return json;
};

const renderCurrentWeather = (data) => {
    const weatherJSX = `
        <h1>${data.name},${data.sys.country}</h1>
        <div id="main">
            <img src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png" alt="weather icon" />
            <span>${data.weather[0].main}</span>
            <p>${Math.round(data.main.temp)} °C</p>
            </div>
        <div id="info">
            <p>Humidity :<span>${data.main.humidity}%</span></p>
            <p>Wind Speed :<span>${data.wind.speed}</span></p>
        </div>
    `;
    weatherContainer.innerHTML = weatherJSX;
    // console.log(data);
}

const renderForecastWeather =(data) => {
    data = data.list.filter(obj => obj.dt_txt.endsWith("12:00:00"));
    console.log(data);
    data.forEech((i) => {
        const forecastJsx = `
            <div>
            <img src="https://api.openweathermap.org/img/w/${i.weather[0].icon}.png" alt="weather icon" />

            </div>
        `;
    })
}

const searchHandler = async () => {

    const cityName = searchInput.value;
    if (!cityName) {
        alert("please Enter City Name!")
    }
    const currentData = await getCurrentWeatherByName(cityName);
    renderCurrentWeather(currentData)
    const forecast = await getForecastWeatherByName(cityName);
    renderForecastWeather(forecast)
}

const positionCallback = async (position) => {
    const { latitude, longitude } = position.coords;
    const currentData = await getCurrentWeatherByCoordinates(latitude, longitude)
    renderCurrentWeather(currentData)
}


const errorCallback = (error) => {
    console.log(error);
}

const locationHandler = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(positionCallback, errorCallback)
    } else {
        alert("your browser does not support geolocation")
    }
}

locationIcon.addEventListener("click", locationHandler)
searchButton.addEventListener("click", searchHandler)