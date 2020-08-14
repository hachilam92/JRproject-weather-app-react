import React from 'react';
import './forecast-weather.scss';
import ForecastList from './forecast-list';

function ForecastWeather (props) {
    return (
        <div className = 'ForecastWeather'>
            <h2 className = 'ForecastWeather__title'>Forecast</h2>
            <ForecastList forecastArray = {props.forecastArray}/>
        </div>
    );
}

export default ForecastWeather;