"use strict";

const input = document.querySelector(".js-input");
const button = document.querySelector(".js-button");

let series = [];

function getServerData(event) {
  let userInput = input.value;
  event.preventDefault();
  fetch(`http://api.tvmaze.com/search/shows?q=${userInput}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(serverData) {
      series = serverData;

      console.log(series);
    })
    .catch(function(err) {
      console.log("Error al traer los datos del servidor", err);
    });
}
button.addEventListener("click", getServerData);
