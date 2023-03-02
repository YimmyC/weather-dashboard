// Global variables
// divs on other side of HTML
let btnSearch = document.querySelector("#btnSearch");

// Functions
function init() {
  // grab last search result from local storage and display it
}

function search() {
  alert("search button clicked");
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {});
}

// function calls and event listeners
init();

// search button event listener
btnSearch.addEventListener("click", search);

// past search button event listener
