"use strict";

const input = document.querySelector(".js-input");
const button = document.querySelector(".js-button");
const container = document.querySelector(".js-container");
const containerFav = document.querySelector(".js-containerFav");

let series = [];
let favorites = [];

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
      listenSeries();

      //   console.log(series);
    })
    .catch(function(err) {
      console.log("Error al traer los datos del servidor", err);
    });
}

function paintSeries() {
  // console.log(series);
  let htmlCode = "";
  // const index= show.indexOf()

  for (let i = 0; i < series.length; i++) {
    htmlCode += `<li class='container__list__item js-card'index='${series[i].show.indexOf}'id='${series[i].show.id}'>`;
    if (series[i].show.image === null) {
      htmlCode +=
        '<img class="item__img"src="./assets/images/tvPlaceholder.png"/>';
    } else {
      htmlCode += `<img class='item__img'src='${series[i].show.image.medium}'/>`;
    }
    htmlCode += `<h3>${series[i].show.name}</h3>`;

    htmlCode += "</li>";
  }

  container.innerHTML = htmlCode;
}

function toggleFavorites(ev) {
  console.log(ev.currentTarget.id);

  const clickedId = parseInt(ev.currentTarget.id);
  for (let i = 0; i < series.length; i++) {
    if (clickedId === series[i].show.id) {
      favorites.push(series[i]);
      paintFavSeries();
    } else {
      paintFavSeries();
    }
  }
  console.log(favorites);
  paintSeries();
  listenSeries();
}
function paintFavSeries() {
  let htmlCode = "";
  for (let i = 0; i < favorites.length; i++) {
    htmlCode += `<li class='container__list__item--fav js-card'id='${favorites[i].show.id}'>`;
    if (favorites[i].show.image === null) {
      htmlCode +=
        '<img class="item__img"src="./assets/images/tvPlaceholder.png"/>';
    } else {
      htmlCode += `<img class='item__img'src='${favorites[i].show.image.medium}'/>`;
    }
    htmlCode += `<h3 class="favTitle">${favorites[i].show.name}</h3>`;

    htmlCode += "</li>";
  }

  containerFav.innerHTML = htmlCode;
}

function listenSeries() {
  const seriesCard = document.querySelectorAll(".js-card");
  for (const serieCard of seriesCard) {
    serieCard.addEventListener("click", toggleFavorites);
  }
}
button.addEventListener("click", getServerData);
