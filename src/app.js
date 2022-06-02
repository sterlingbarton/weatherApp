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
    currentHigh.textContent = `${tempMax}°F  |`;
    let currentLow = document.querySelector(".low");
    currentLow.textContent = `${tempMin}°F`;
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
    currentHigh.textContent = `${tempMax}°F  |`;
    let currentLow = document.querySelector(".low");
    currentLow.textContent = `${tempMin}°F`;
  });
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showTemp);
}

let current = document.querySelector(".location");
current.addEventListener("click", getLocation);
