import React from 'react';
import './weather-bottom.scss';
import OtherCity from './OtherCities/other-cities';
import ForecastWeather from './ForecastWeather/forecast-weather';


function WeatherBottom (props) {
    const {dataArray, onOtherCitiesClick} = props.children;
    const cityArray = dataArray.slice(1);
    const forecastArray = dataArray[0].forecast;
    
    return (
        <div className = 'WeatherBottom'>
            <OtherCity>
                {
                    {
                        cityArray,
                        onOtherCitiesClick
                    }    
                }
            </OtherCity>
            <div className = 'division'></div>
            <ForecastWeather forecastArray = {forecastArray}/>
        </div>
    );
}

export default WeatherBottom;