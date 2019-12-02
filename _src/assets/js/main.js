"use strict";

const input = document.querySelector(".js-input");
const button = document.querySelector(".js-button");
const container = document.querySelector(".js-container");

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

      paintSeries();

      //   console.log(series);
    })
    .catch(function(err) {
      console.log("Error al traer los datos del servidor", err);
    });
}

function paintSeries() {
  console.log(series);
  let htmlCode = "";
  for (const serie of series) {
    htmlCode += "<li class='container__list__item'>";
    debugger;
    if (serie.show.image === null) {
      htmlCode +=
        '<img class="item__img"src="./assets/images/tvPlaceholder.png"/>';
    } else {
      htmlCode += `<img class='item__img'src='${serie.show.image.medium}'/>`;
    }
    htmlCode += `<h3>${serie.show.name}</h3>`;

    htmlCode += "</li>";
  }
  container.innerHTML = htmlCode;
}
button.addEventListener("click", getServerData);
