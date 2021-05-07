let apiKey = "4fc145a29e5e0b7f8bb3055a335e63cc";
let unit = "metric";
let apiExtension = "https://api.openweathermap.org/data/2.5/weather?";

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude, longitude);
  let apiUrl = `${apiExtension}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  console.log("clicked");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `Searching`;
  navigator.geolocation.getCurrentPosition(showLocation);
}

let current = document.querySelector("#current");
current.addEventListener("click", currentLocation);

function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let name = response.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = name;
  let detail = response.data.weather[0].description;
  let desciption = document.querySelector("#description");
  desciption.innerHTML = detail;
  let cel = document.querySelector("#cel");
  cel.innerHTML = `${temp}`;
  console.log(temp);
  let feriheitTemp = Math.round((temp * 9) / 5 + 32);
  function changeFeriheit(event) {
    event.preventDefault();
    cel.innerHTML = feriheitTemp;
  }
  let feriheit = document.querySelector("#feriheit");
  feriheit.addEventListener("click", changeFeriheit);
}

function searchCityName(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#text-input");
  let cityName = searchInput.value;
  let apiUrl = `${apiExtension}q=${cityName}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCityName);

function change() {
  date.innerHTML = `${day} ${hour}:${minutes}`;
}
let date = document.querySelector("#date");
let now = new Date();
let day = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
day = days[day];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
date.innerHTML = `${day} ${hour}:${minutes}`;

date.addEventListener("click", change);
