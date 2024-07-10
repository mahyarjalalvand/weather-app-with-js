const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEYS = "1de427fd7c85dc7ba2884dd9b8377662";

const searchInput = document.querySelector("input")
const searchButton = document.querySelector("button")
const weatherContainer = document.getElementById("weather");

const getCurrentWeatherByName = async (city) => {
    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEYS}&units=metric`;
    const response = await fetch(url);
    const json = response.json()
    return json
}
const renderCurrentWeather = (data) => {
    const weatherJSX = `
        <h1>${data.name},${data.sys.country}</h1>
        <div id="main">
            <img src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png" alt="weather icon" />
            <span>${data.weather[0].main}</span>
            <p>${Math.round(data.main.temp)} °C</p>
            </div>
        <div id="info">
            <p>Humidity :<span>${data.main.humidity}</span></p>
            <p>Humidity :<span>${data.wind.speed}</span></p>
        </div>
    `;
    weatherContainer.innerHTML = weatherJSX;
    console.log(data);
}
const searchHandler = async () => {

    const cityName = searchInput.value;
    if (!cityName) {
        alert("please Enter City Name!")
    }
    const currentData = await getCurrentWeatherByName(cityName);
    renderCurrentWeather(currentData)
}

searchButton.addEventListener("click", searchHandler)