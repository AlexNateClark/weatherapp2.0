import axios from "axios"

// https://api.open-meteo.com/v1/forecast?&hourly=temperature_2m&hourly=apparent_temperature&hourly=precipitation&hourly=weathercode&hourly=windspeed_10m&daily=weathercode&daily=temperature_2m_max&daily=temperature_2m_min&daily=apparent_temperature_max&daily=apparent_temperature_min&daily=precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&past_days=0&forecast_days=7&start_date=2023-04-01&end_date=2023-04-07

export function getWeather(lat, lon, timezone){
    return axios.get("https://api.open-meteo.com/v1/forecast?&hourly=temperature_2m&hourly=apparent_temperature&hourly=precipitation&hourly=weathercode&hourly=windspeed_10m&daily=weathercode&daily=temperature_2m_max&daily=temperature_2m_min&daily=apparent_temperature_max&daily=apparent_temperature_min&daily=precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&past_days=0&forecast_days=7&start_date=2023-04-01&end_date=2023-04-07", { params: {
        latitude: lat,
        longitude: lon,
        timezone
    }})
}