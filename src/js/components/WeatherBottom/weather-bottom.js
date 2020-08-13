import React from 'react';
import './weather-bottom.scss';
import OtherCity from './OtherCities/other-cities';
import ForecastWeather from './ForecastWeather/forecast-weather';


function WeatherBottom (props) {
    return (
        <div className = 'WeatherBottom'>
            <OtherCity  cityArray = {props.cityArray}
                        onOtherCitiesClick = {props.onOtherCitiesClick} 
            />
            <div className = 'division'></div>
            <ForecastWeather forecastArray = {props.forecastArray}/>
        </div>
    );
}

export default WeatherBottom;