let icon = document.querySelector(".weather__icon");
let temp = document.querySelector(".temp");
let weatherSituation = document.querySelector(".weather__situation");
let weatherLocation = document.querySelector(".weather__location");
let containerApp = document.querySelector(".container__wrap");
let container = document.querySelector(".container")

const weatherKey = 'ebe187b9c98855b996bad031cbbaf7f7'

function callLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationSucess, error);

    }

    else {
        alert("Você não está com a localização ligada")
    }
};

async function locationSucess(position) {

    const { latitude, longitude } = position.coords;
    const weatherData = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherKey}`);
    let weatherDataJson = await weatherData.json();
    console.log(weatherDataJson);
    defineDados(weatherDataJson);

};

function defineDados(weatherDataJson){
    let temperatura = Math.floor(weatherDataJson.main.temp - 273);
    let situacao = weatherDataJson.weather[0].main;
    let localizacao = weatherDataJson.sys.country + ", " + weatherDataJson.name;
    let icone = weatherDataJson.weather[0].icon;
    let templateContainer = ` <div class="weather__icon"><img src="/imgs/${icone}.png" alt=""></div>
<div class="temp">${temperatura}</div>
<div class="weather__situation">${situacao}</div>
<div class="weather__location">${localizacao}</div>`;
    containerApp.innerHTML = templateContainer;

    if (temperatura > 25){
        container.classList.replace("container", "container__hot");
    }
};


function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

callLocation()