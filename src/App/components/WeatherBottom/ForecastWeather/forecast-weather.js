import React from 'react';
import './forecast-weather.scss';
import ForecastListItem from './forecast-list-item';

function ForecastWeather (props) {
	const forecastList = props.forecastArray.map((forecast) =>
		<ForecastListItem
		 	key ={forecast.day} 
		 	info = {forecast}
		/>
	);
	return (
		<div className = 'ForecastWeather'>
			<h2 className = 'ForecastWeather__title'>
				Forecast
			</h2>
			<div className = 'ForecastList'>
				{forecastList}
			</div>
		</div>
	);
}

export default ForecastWeather;