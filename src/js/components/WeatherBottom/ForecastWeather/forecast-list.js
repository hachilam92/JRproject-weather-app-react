import React from 'react';
import ForecastListItem from './forecast-list-item';

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

export default ForecastList;