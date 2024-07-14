import { showModal } from "./modal.js";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEYS = "1de427fd7c85dc7ba2884dd9b8377662";

const getWeatherData = async (type, data) => {
    let url = null;
    switch (type) {
        case "current":
            if (typeof data === "string") {
                url = `${BASE_URL}/weather?q=${data}&appid=${API_KEYS}&units=metric`
            } else {
                url = `${BASE_URL}/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEYS}&units=metric`;
            }
            break;
        case "forecast":
            if (typeof data === "string") {
                url = `${BASE_URL}/forecast?q=${data}&appid=${API_KEYS}&units=metric`
            } else {
                url = `${BASE_URL}/forecast?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEYS}&units=metric`;
            }
            break;
        default:
            url = `${BASE_URL}/forecast?q=tehran&appid=${API_KEYS}&units=metric`

            break;
    }

    try {
        const response = await fetch(url);
        const json = await response.json()
        if (+json.cod === 200) {
            return json;
        } else {
            showModal(json.message)
        }
    } catch (error) {
        console.log(error);
    }
}

export default getWeatherData;