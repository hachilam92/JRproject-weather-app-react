const {City, Weather, ForecastWeather} = require('./weather-class');
const axios = require('../../../node_modules/axios');

let appid =`${process.env.appid}`;      // Fill in API key
appid = 'e787b14540b854a704b00c7a9dfe1342'; 

const openWeather = axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5',
    params: {
        appid: appid
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