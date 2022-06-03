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
let time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
let fullDate = `${month} ${date} ${time}`;

let displayDate = document.querySelector(".current-date");
displayDate.textContent = `${day}, ${fullDate}`;

let search = document.querySelector("#search");
let searchInput = document.querySelector(".search-box");

function returnCity(event) {
  event.preventDefault();
  let string = searchInput.value;
  let firstLetter = string[0];
  let cap = firstLetter.toUpperCase();
  let newString = string.replace(firstLetter, cap);
  let heading = document.querySelector("h1");
  heading.textContent = newString;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newString}&units=imperial&appid=0dc80dcac647130267c51a963d637c8f`;

  axios.get(apiUrl).then(function (response) {
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
  });
  searchInput.value = "";
}

search.addEventListener("submit", returnCity);

let latitude = "";
let longitude = "";
function showTemp(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=0dc80dcac647130267c51a963d637c8f`;
  axios.get(apiUrl).then(function (response) {
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
    icon.style.visibility = "visible";
    icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  });
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showTemp);
}

let current = document.querySelector(".location");
current.addEventListener("click", getLocation);

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

let convertBtn = document.querySelector(".convert");
convertBtn.addEventListener("click", convert);
