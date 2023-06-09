import "./static/css/style.css"
import { getWeather } from "./weather"
import { ICON_MAP } from "./iconMap"


navigator.geolocation.getCurrentPosition(positionSuccess, positionError) 

function positionSuccess({ coords }) {
    getWeather(
        coords.latitude,
        coords.longitude,
        Intl.DateTimeFormat().resolvedOptions().timeZone
    )
        .then(renderWeather)
        .catch(e => {
        console.error(e)
        alert("Error getting weather")
        })
}

function positionError(){
    alert("Error gettting location")
}



function renderWeather({ current, daily, hourly}) {
    renderCurrentWeather(current)
    renderDailyWeather(daily)
    renderHourlyWeather(hourly)
    document.body.classList.remove("blurred")
}


function setValue(selector, value, { parent = document} = {}) {
    parent.querySelector(`[data-${selector}]`).textContent = value
}

function getIconUrl(iconCode) {
    return `static/img/${ICON_MAP.get(iconCode)}.png`
}


const currentIcon = document.querySelector("[data-current-icon]")
function renderCurrentWeather(current) {
    currentIcon.src = getIconUrl(current.iconCode)
    setValue("current-temp", current.currentTemp)
    setValue("current-high", current.highTemp)
    setValue("current-low", current.lowTemp)
    setValue("current-fl-high", current.highFeelsLike)
    setValue("current-fl-low", current.lowFeelsLike)
    setValue("current-wind", current.windSpeed)
    setValue("current-precip", current.precip)
}



const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday:
"long"})
const dailySection = document.querySelector("[data-day-section]")
const dayCardTemplate = document.getElementById("day-card-template")
function renderDailyWeather(daily){
    dailySection.innerHTML = ""
    daily.forEach(day => {
        const element = dayCardTemplate.content.cloneNode(true)
        setValue("temp", day.maxTemp, { parent: element})
        setValue("date", DAY_FORMATTER.format(day.timestamp), { parent: 
        element})
        element.querySelector("[data-icon]").src = getIconUrl(day.iconCode)
        dailySection.append(element)
    })
}





const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, { hour:
"numeric"})
const hourlySection = document.querySelector("[data-hour-section]")
const hourRowTemplate = document.getElementById("hour-row-template")
function renderHourlyWeather(hourly) {
    hourlySection.innerHTML = ""
    hourly.forEach(hour => {
        const element = hourRowTemplate.content.cloneNode(true)
        setValue("temp", hour.temp, { parent: element})
        setValue("fl-temp", hour.feelsLike, { parent: element})
        setValue("wind", hour.windSpeed, { parent: element})
        setValue("precip", hour.precip, { parent: element})
        setValue("day", DAY_FORMATTER.format(hour.timestamp), { parent: 
        element})
        setValue("time", HOUR_FORMATTER.format(hour.timestamp), { parent: 
        element })
        element.querySelector("[data-icon]").src = getIconUrl(hour.iconCode)
        hourlySection.append(element)
    })
}






// create a function that changes the img logos and background 
// color based on the time of day 

// 1st how do we get the time of day 

// 2nd create an if , if else statement stating if the time of day is this time, then run these imgages 

// 3rd create an if, if else statement stating if the time of day is this time, then run this background 





// $(document).ready(function(){
// 	var d = new Date();
// 	var n = d.getHours();
// 	if (n > 19 || n < 6)
// 	  // If time is after 7PM or before 6AM, apply night theme to ‘body’
// 	  document.body.className = "night";
// 	else if (n > 16 && n < 19)
// 	  // If time is between 4PM – 7PM sunset theme to ‘body’
// 	  document.body.className = "sunset";
// 	else
// 	  // Else use ‘day’ theme
// 	  document.body.className = "day";
// });