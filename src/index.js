import {getDataWeatherByCity, getDataWeatherByLatLon} from './js/api/requests'
import './style.css';

const weatherInfo = document.querySelector('.weather-info');
const input = document.querySelector('.input-search')

const iniInformationWeather = () => {
	async function success(position) {
		const dataWeather = await getDataWeatherByLatLon(position.coords);
		input.placeholder = `${dataWeather.city},${dataWeather.country}`
		createInformationWeather(dataWeather);
	};
	
	navigator.geolocation.getCurrentPosition(success);
}

const createInformationWeather = (weather) => {
	const html = `
		<div class="city-country">
			<span class="city">${weather.city}</span>
			<span class="country">${weather.country}</span>
		</div>
		<div class="temperature-info">
			<span class="temperature">${weather.temperature}°C</span>
		</div>
		
		<div class="squares-info">
		<div class="square humidity">
			<span><strong>Humidity</strong></span>
			<img src="./src/images/humidity.png" alt="humidity percent">
			<span><strong>${weather.humidity} %</strong></span>
			</div>	
			<div class="square weather">
				<img src=\"./images/${weather.icon}.png\">
				<span><strong>${weather.description}</strong></span>
			</div>
		<div class="square wind">
			<span><strong>Wind Speed</strong></span>
			<img src="./src/images/wind.png" alt="wind speed">
			<span><strong>${weather.speedWind} Km/h</strong></span>
		</div>
		</div>
		`

	weatherInfo.innerHTML = html;
}

input.addEventListener("keyup", async (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
		const [city, country] = input.value.split(',')
		const dataWeather = await getDataWeatherByCity(city, country);
		createInformationWeather(dataWeather);
		input.value = '';
  }
});

iniInformationWeather()
