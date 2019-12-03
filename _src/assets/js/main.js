"use strict";

const input = document.querySelector(".js-input");
const button = document.querySelector(".js-button");
const container = document.querySelector(".js-container");
const containerFav = document.querySelector(".js-containerFav");

let series = [];
let favorites = [];

// guardar favoritos en el localstorage

function setLocalStorage() {
  console.log("setLocalStorage", favorites);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
function getLocalStorage() {
  console.log("comprobando");
  const localStorageFavSeries = JSON.parse(localStorage.getItem("favorites"));
  if (localStorageFavSeries !== null) {
    console.log("tengo datos");
    favorites = localStorageFavSeries;
    paintFavSeries();
    listenSeries();
  }
}

// Conseguir datos de la api filtrando por lo que el usuario nos solicita a través del input.
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
    })
    .catch(function(err) {
      console.log("Error al traer los datos del servidor", err);
    });
}

// una vez el usuario solicita buscar información de una serie se les muestra en pantalla la foto y el nombre de la serie. En esta función pintamos como debe aparecer en pantalla.

function paintSeries() {
  let htmlCode = "";
  const isFav = favorites.foundIndex !== -1;
  if (isFav) {
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
  } else {
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
  }
  container.innerHTML = htmlCode;
}

//he creado un array vacío de favoritos y lo tengo que llenar con el array que me traigo de la api. Utilizo el id de los datos y introduzco toda la información del array al array de favoritos con el método push.

function toggleFavorites(ev) {
  console.log(ev.currentTarget.id);

  const clickedId = parseInt(ev.currentTarget.id);
  let foundIndex = -1;

  for (let i = 0; i < favorites.length; i++) {
    if (clickedId === favorites[i].show.id) {
      foundIndex = i;
    }
  }
  if (foundIndex === -1) {
    for (let i = 0; i < series.length; i++) {
      if (clickedId === series[i].show.id) {
        favorites.push(series[i]);
      }
    }
  } else {
    favorites.splice(foundIndex, 1);
  }
  console.log(favorites);
  paintFavSeries();
  paintSeries();
  listenSeries();
  setLocalStorage();
}
// esta función es para que una vez el usuario selecciona su serie favorita se pinta en la sección serie favoritas de la pantalla.
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
// esta función es donde escucho el contedor de la foto y el título.
function listenSeries() {
  const seriesCard = document.querySelectorAll(".js-card");
  for (const serieCard of seriesCard) {
    serieCard.addEventListener("click", toggleFavorites);
  }
}
button.addEventListener("click", getServerData);
getLocalStorage();
