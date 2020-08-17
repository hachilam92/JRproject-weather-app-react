import React from 'react';
import './weather-bottom.scss';
import OtherCity from './OtherCities/other-cities';
import ForecastWeather from './ForecastWeather/forecast-weather';


function WeatherBottom (props) {
    const cityArray = props.children.slice(1);
    const forecastArray = props.children[0].forecast;
    return (
        <div className = 'WeatherBottom'>
            <OtherCity  cityArray = {cityArray}
                        onOtherCitiesClick = {props.onOtherCitiesClick} 
            />
            <div className = 'division'></div>
            <ForecastWeather forecastArray = {forecastArray}/>
        </div>
    );
}

export default WeatherBottom;