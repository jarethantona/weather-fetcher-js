const api = {
  key: "5a421f099e0317c6b2dc4e4565a4901d",
  baseURL: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(event) {
  if (event.keyCode == 13) {
    getResults(searchBox.value);
  }
}

function getResults (query) {
  fetch(`${api.baseURL}weather?q=${query}&units=imperial&appid=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hiLow = document.querySelector('.hi-low');
  hiLow.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;
}

function dateBuilder (enteredDate) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sun","Mon","Tues","Wed","thurs","Fri","Sat"];

  let day = days[enteredDate.getDay()];
  let date = enteredDate.getDate();
  let month = months[enteredDate.getMonth()];
  let year = enteredDate.getFullYear();

  return `${day} ${date} ${month} ${year}`;

}
