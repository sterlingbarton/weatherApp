let icon = document.querySelector("img");
getLocation();

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
function formatDate(day) {
  let date = new Date(day * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let formatDay = days[date.getDay()];
  return formatDay;
}
let time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
let fullDate = `${month} ${date} ${time}`;

let displayDate = document.querySelector(".current-date");
displayDate.textContent = `${day}, ${fullDate}`;

let search = document.querySelector("#search");
let searchInput = document.querySelector(".search-box");
let forcastContainer = document.querySelector(".forecast-container");

function returnCity(event) {
  event.preventDefault();
  let string = searchInput.value;
  let firstLetter = string[0];
  let cap = firstLetter.toUpperCase();
  let newString = string.replace(firstLetter, cap);
  let heading = document.querySelector("h1");
  heading.textContent = newString;
  let apiKey = "ea915c51860741b81bf01c810278b539";
  let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${newString}&units=imperial&appid=0dc80dcac647130267c51a963d637c8f`;

  axios
    .get(apiUrl1)
    .then(function (response) {
      let tempMin = Math.round(response.data.main.temp_min);
      let tempMax = Math.round(response.data.main.temp_max);
      let currentHigh = document.querySelector(".high");
      currentHigh.textContent = `${tempMax}°F  | `;
      let currentLow = document.querySelector(".low");
      currentLow.textContent = `${tempMin}°F`;
      let description = document.querySelector(".description");
      description.textContent = response.data.weather[0].description;
      let humidity = document.querySelector(".humidity");
      humidity.textContent = `Humidity: ${response.data.main.humidity}%`;
      let windSpeedElement = document.querySelector(".wind-speed");
      let windSpeed = Math.round(response.data.wind.speed);
      windSpeedElement.textContent = `Wind: ${windSpeed}mph`;
      let icon = document.querySelector("img");
      icon.style.visibility = "visible";
      icon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
      return response;
    })
    .then(function (response) {
      let apiUrl2 = `https://api.openweathermap.org/data/3.0/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=hourly,minutely,alerts&units=imperial&appid=${apiKey}`;
      axios.get(apiUrl2).then(function (response) {
        let forecastArr = [];
        let apiForecast = response.data.daily;
        apiForecast.forEach(function (forecastDay) {
          let forecastDayInfo = {
            date: forecastDay.dt,
            iconSRC: `http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png`,
            degree: `${Math.round(forecastDay.temp.max)}°F | ${Math.round(
              forecastDay.temp.min
            )}°F`,
          };
          forecastArr.push(forecastDayInfo);
          forecast = forecastArr.slice(0, 5);
        });
        const week = forecast.map(function (forecastDay) {
          return `<div class="col-sm forecast-day">
          <h2>${formatDate(forecastDay.date)}</h2>
           <img class="icon" src="${forecastDay.iconSRC}" alt="Icon" />
          <p class="degree">${forecastDay.degree}</p>
        </div>
        `;
        });
        forcastContainer.innerHTML = week.join(
          `<div class="vertical-rule"></div>`
        );
      });
    });

  searchInput.value = "";
}

search.addEventListener("submit", returnCity);

let latitude = "";
let longitude = "";
let forecast = [];
function showTemp(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  let apiKey = "ea915c51860741b81bf01c810278b539";
  let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
  let apiUrl2 = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl1).then(function (response) {
    let heading = document.querySelector("h1");
    let location = response.data.name;
    heading.textContent = location;
    let tempMin = Math.round(response.data.main.temp_min);
    let tempMax = Math.round(response.data.main.temp_max);
    let currentHigh = document.querySelector(".high");
    currentHigh.textContent = `${tempMax}°F  | `;
    let currentLow = document.querySelector(".low");
    currentLow.textContent = `${tempMin}°F`;
    let description = document.querySelector(".description");
    description.textContent = response.data.weather[0].description;
    let humidity = document.querySelector(".humidity");
    humidity.textContent = `Humidity: ${response.data.main.humidity}%`;
    let windSpeedElement = document.querySelector(".wind-speed");
    let windSpeed = Math.round(response.data.wind.speed);
    windSpeedElement.textContent = `Wind: ${windSpeed}mph`;
    let icon = document.querySelector("img");
    icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  });
  axios
    .get(apiUrl2)
    .then(function (response) {
      let forecastArr = [];
      let apiForecast = response.data.daily;
      apiForecast.forEach(function (forecastDay) {
        let forecastDayInfo = {
          date: forecastDay.dt,
          iconSRC: `http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png`,
          degree: `${Math.round(forecastDay.temp.max)}°F | ${Math.round(
            forecastDay.temp.min
          )}°F`,
        };
        forecastArr.push(forecastDayInfo);
        forecast = forecastArr.slice(0, 5);
      });
    })
    .then(function () {
      const week = forecast.map(function (forecastDay) {
        return `<div class="col-sm forecast-day">
          <h2>${formatDate(forecastDay.date)}</h2>
           <img class="icon" src="${forecastDay.iconSRC}" alt="Icon" />
          <p class="degree">${forecastDay.degree}</p>
        </div>
        `;
      });
      forcastContainer.innerHTML = week.join(
        `<div class="vertical-rule"></div>`
      );
    });
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showTemp);
}

let current = document.querySelector(".location");
current.addEventListener("click", getLocation);

let highTemp = document.querySelector(".high");
let lowTemp = document.querySelector(".low");
highTemp.addEventListener("click", convert);
lowTemp.addEventListener("click", convert);

let isFarenheight = true;
function convert() {
  isFarenheight = !isFarenheight;
  let high = document.querySelector(".high");
  let low = document.querySelector(".low");
  let highTemp = 80;
  let lowTemp = 65;
  if (isFarenheight) {
    high.textContent = `${highTemp}°F | `;
    low.textContent = `${lowTemp}°F`;
  } else {
    high.innerHTML = `${highTemp - 32}°C | `;
    low.innerHTML = `${lowTemp - 32}°C`;
  }
}
