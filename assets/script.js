// Global variables
// divs on other side of HTML
let btnSearch = document.querySelector("#btnSearch");
let inputSearch = document.querySelector("#citySearch");
let currentCity = document.querySelector("#currentCity");
let currentTemp = document.querySelector("#currentTemp");
let currentWind = document.querySelector("#currentWind");
let currentHumidity = document.querySelector("#currentHumidity");
let forecastCards = document.querySelector("#forecastCards");

// Functions
function init() {
  // grab last search result from local storage and display it
}

function search() {
  // get city name from input
  let cityName = inputSearch.value.trim();
  console.log(cityName);
  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=6e9967825cf147499a46407cb45cce16&units=imperial`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // chicago
      // temp wind & humidity
      currentCity.innerHTML = `${data.city.name}`;
      currentTemp.innerHTML = `temp: ${data.list[0].main.temp}`;
      currentWind.innerHTML = `wind: ${data.list[0].wind.speed}`;
      currentHumidity.innerHTML = `Humidity: ${data.list[0].main.humidity}`;
      // 5 day forecast
      data.list.forEach((day) => {
        let midnight = day.dt_txt.split(" ")[1];
        if (midnight === "00:00:00") {
          console.log(day);
          let dayCard = document.createElement("div");
          dayCard.innerHTML += `<div>${day.dt_txt}</div>`;
          dayCard.innerHTML += `<div>${day.main.temp}</div>`;
          dayCard.innerHTML += `<div>${day.wind.speed}</div>`;
          dayCard.innerHTML += `<div>${day.main.humidity}</div>`;
          forecastCards.append(dayCard);
        }
      });
    });
}

// function calls and event listeners
init();

// search button event listener
btnSearch.addEventListener("click", search);

// past search button event listener
