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
  let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  let searchHistoryList = document.getElementById("searchList");
  searchHistoryList.innerHTML = "";
  searchHistory.forEach(function (searchEntry) {
    let li = document.createElement("li");
    li.textContent = searchEntry;
    searchHistoryList.appendChild(li);
  });
}
// seatrch function
function search() {
  // call JSON data
  let searchInput = document.getElementById("citySearch").value;
  saveSearch(searchInput);
  // get city name from input
  event.preventDefault();
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
      let cityDiv = document.getElementById("divCity");
      cityDiv.classList.remove("hidden");
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
          let fiveDay = document.getElementById("forecastCards");
          fiveDay.classList.remove("hidden");
          dayCard.innerHTML += `<div class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${day.dt_txt}</div>`;
          dayCard.innerHTML += `<div class="font-normal text-gray-700 dark:text-gray-400">Temp:${day.main.temp}</div>`;
          dayCard.innerHTML += `<div class="font-normal text-gray-700 dark:text-gray-400">Wind:${day.wind.speed}</div>`;
          dayCard.innerHTML += `<div class="font-normal text-gray-700 dark:text-gray-400">Humidity:${day.main.humidity}</div>`;
          forecastCards.append(dayCard);
        }
      });
    });
}
// save search to local storage
function saveSearch(searchInput) {
  const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  searchHistory.push(searchInput);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

// function calls and event listeners
init();

// search button event listener
btnSearch.addEventListener("click", search);

// past search button event listener
