import React from 'react';
import './forecast-weather.scss';

function ForecastListItem (props) {

    const iconUrlAddress = `http://openweathermap.org/img/wn/${props.info.icon}@2x.png`;
    return (
        <div className = 'ForecastList__Item'>
            <h3 className = 'ForecastList__Item__day'>{props.info.day}</h3>
            <img className = 'ForecastList__Item__icon' src = {iconUrlAddress} alt = {props.info.description}/>
            <div className = 'ForecastList__Item__temperature'>{props.info.temperature} °</div>
        </div>
    );
}

function ForecastList (props) {
    const forecastList = props.forecastArray.map((forecast) =>
        <ForecastListItem key ={forecast.day} info = {forecast}/>
    );
    return (
        <div className = 'ForecastList'>
            {forecastList}
        </div>
    );
}


function ForecastWeather (props) {
    return (
        <div className = 'ForecastWeather'>
            <h2 className = 'ForecastWeather__title'>Forecast</h2>
            <ForecastList forecastArray = {props.forecastArray}/>
        </div>
    );
}

export default ForecastWeather;