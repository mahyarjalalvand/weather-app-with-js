import getWeatherData from "./utils/httpReq.js";
import { removeModal, showModal } from "./utils/modal.js";
import { getWeekDay } from "./utils/customeDate.js";

const searchInput = document.querySelector("input")
const searchButton = document.querySelector("button")
const weatherContainer = document.getElementById("weatherContent");
const forecastContainer = document.getElementById("forecast");
const locationIcon = document.getElementById("location");
const modalBtn = document.getElementById("modal-button");
const loader = document.getElementById("loaderContainer");

const renderCurrentWeather = (data) => {
    loader.classList.add("hidden")
    if (!data) return;
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
}



const renderForecastWeather = (data) => {
    if (!data) return;

    forecastContainer.innerHTML = "";
    data = data.list.filter(obj => obj.dt_txt.endsWith("12:00:00"));
    data.forEach((i) => {
        const forecastJsx = `
            <div>
                <img src="https://openweathermap.org/img/w/${i.weather[0].icon}.png" alt="weather icon" />
                <h3>${getWeekDay(i.dt)}</h3>
                <p>${Math.round(i.main.temp)} °C</p>
                <span>${i.weather[0].main}</span>
            </div>
        `;
        forecastContainer.innerHTML += forecastJsx;
    })
};

const searchHandler = async () => {

    const cityName = searchInput.value;
    if (!cityName) {
        showModal("please Enter City Name!")
        return;
    } else {
        searchInput.value = "";
    }
    loader.classList.remove("hidden")
    const currentData = await getWeatherData("current", cityName);
    renderCurrentWeather(currentData)
    const forecastData = await getWeatherData("forecast", cityName);
    renderForecastWeather(forecastData)
}

const positionCallback = async (position) => {
    const currentData = await getWeatherData("current", position.coords)
    renderCurrentWeather(currentData)
    const forecastData = await getWeatherData("forecast", position.coords)
    renderForecastWeather(forecastData)
}
const errorCallback = (error) => {
    console.log(error);
}
const locationHandler = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(positionCallback, errorCallback)
    } else {
        showModal("your browser does not support geolocation")
        return
    }
}
const initHandler = async () => {
    const currentData = await getWeatherData("current", "tehran");
    renderCurrentWeather(currentData);
    const forecastData = await getWeatherData("forecast", "tehran");
    renderForecastWeather(forecastData);
}
locationIcon.addEventListener("click", locationHandler)
searchButton.addEventListener("click", searchHandler)
modalBtn.addEventListener("click", removeModal)
document.addEventListener("DOMContentLoaded", initHandler)