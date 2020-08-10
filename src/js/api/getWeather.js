const {Weather} = require('./weather-class');
const axios = require('../../../node_modules/axios');

let APPID =`${process.env.REACT_APP_APPID}`;      // Fill in API key

const openWeather = axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5',
    params: {
        appid: APPID
    }            
});

function requestWeather (location, weatherType = 'current') {
    const route = (weatherType === 'forecast')? '/forecast':'/weather';
    const response = openWeather.get(route, {
        params: { 
            q: location,
        }
    });
    return response;
}

function filterForecast (forecastList) {
    let forecastFiltered = [];
    forecastList.forEach((item, index) => {
        if (index % 8 === 0) {
            forecastFiltered.push(item);
        }
    });
    return forecastFiltered;
}

function getWeather (cc, city) {
    const location = `${city}, ${cc}`;
    return Promise.all([requestWeather(location), requestWeather(location, 'forecast')])
    .then((responseArray) =>{
        const curRes = responseArray[0];
        const forRes = responseArray[1];
        const forecast = filterForecast(forRes.data.list).map(item => new Weather(item));
        // const forecast = forRes.data.list.map(item => new Weather(item));
        const current = new Weather (curRes.data);
        const data = {current, forecast};
        console.log(data);
        return data;
    })
    .catch(err => {
        console.log(err.message);
    });
}

export default getWeather;