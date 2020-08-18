import {Weather, Forecast} from './weather-class';

const axios = require('axios');

let APPID =`${process.env.REACT_APP_APPID}`;      // Fill in API key

const openWeather = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
        appid: APPID
    }            
});

function requestWeather (location, weatherType = 'current') {
    const route = (weatherType === 'forecast')? '/forecast':'/weather';
    const response = openWeather.get(route, {
        params: { 
            q: location
        }
    });
    return response;
}

function getWeather (cc, city) {
    const location = `${city}, ${cc}`;
    return Promise.all([requestWeather(location), requestWeather(location, 'forecast')])
    .then((responseArray) =>{
        const curRes = responseArray[0];
        const forRes = responseArray[1];
        const cityName = forRes.data.city.name;
        const countryCode = forRes.data.city.country;
        const current = new Weather (curRes.data);
        const rawForecast = forRes.data.list.map(item => new Weather(item));
        const filteredForecast = filterRawForecast(rawForecast);
        const forecast = formatForecast(filteredForecast);
        const data = {cityName, countryCode, current, forecast};
        return data;
    })
    .catch(err => {
        console.log(err.message);
    });
}

function filterRawForecast (rawForecast) {
    let filteredForecast = [];
    for(let i = 0; i < rawForecast.length; i += 8) {
        filteredForecast.push(rawForecast[i]);
    }
    return filteredForecast;
}

function formatForecast (filteredForecast, days = 5) {
	const dayList = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
	const today = new Date();
	let currentIndex = today.getDay() - 1;
	let formattedForecast = [];

	for (let i = 0; i < days; i++) {
		currentIndex = (currentIndex === dayList.length -1)? 0 : currentIndex + 1;
        formattedForecast.push(new Forecast(filteredForecast[i], dayList[currentIndex]));
	}
	return formattedForecast;
}

export default getWeather;