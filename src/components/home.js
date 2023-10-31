const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dataOutput = document.querySelector('.data');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.querySelector('.locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelector('.city');

//defualt city when the page loads
let cityInput = "London";

//Add click event to each city in the panel
cities.forEach((city) => {
    city.addEventListener('click, (e) => {
        cityInput = e. target.innerHTML;
        /*function that fetches and displays all the data from the weather api
        (will write it soon)*/
        fethWeatherdata(),
        //FADE OUT THE APP (SIMPLE ANIMATION)
        app.getElementsByClassName.opacity ="0";
    });
})