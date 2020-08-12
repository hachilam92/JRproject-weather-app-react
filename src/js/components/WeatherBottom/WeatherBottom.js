import React from 'react';
import OtherCity from './OtherCities/OtherCity';
import ForecastWeather from './ForecastWeather/ForecastWeather';


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