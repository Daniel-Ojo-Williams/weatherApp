const city = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const apiKey = '2669c0e71ceb9b0a4b6b17fbea8bb72b';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric';
const container = document.querySelector('.container');
const weatherIcon = document.querySelector('.weather-icon');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-box .weather-details');
const errorDisplay = document.querySelector('.error')

async function checkWeather(){
  // const response = await fetch(apiUrl + `&appid=${apiKey}&q=${city.value}`);
  // let data = await response.json();
  // console.log(data);

  fetch(apiUrl + `&appid=${apiKey}&q=${city.value}`).then(response => response.json()).then(data => {

    if (data.cod === '404' || city.value.trim()===''){
      container.style.height = '450px'
      weatherBox.style.display = 'none';
      weatherDetails.style.display = 'none';
      errorDisplay.style.display = 'block';
      errorDisplay.classList.add('fadeIn');
      return;
    } 
    
    
    container.style.height = '580px'
    weatherBox.style.display = 'block';
    weatherBox.classList.add('fadeIn');
    weatherDetails.style.display = 'flex';
    errorDisplay.style.display = 'none'
    errorDisplay.classList.remove('fadeIn');



    document.querySelector('.weather-box .city').innerHTML = `${data.name}, ${data.sys.country}`;
    document.querySelector('.weather-box .temperature').innerHTML = `${Math.ceil(data.main.temp)}°C`;
    document.querySelector('.weather-details .humidity span').innerHTML = `${data.main.humidity}%`;
    document.querySelector('.weather-details .wind span').innerHTML = `${data.wind.speed}km/hr`;
    document.querySelector('.weather-box .weather-condition').innerHTML = data.weather[0].description;
  
    const weatherCondition = data.weather[0].main;
    weatherIcon.setAttribute('src', `images/cloud_images/${weatherCondition}.png`)
    console.log(`images/${weatherCondition}.png`)
  }).catch(error => console.log(error))
}  

searchBtn.addEventListener('click', () => {
  // const city = document.querySelector('.search input')
  // console.log(city.value);
  checkWeather();
})



city.addEventListener('keypress', e => {console.log('active')
  if (city ===document.activeElement && e.code === 'Enter') {
    checkWeather()
  }
})

