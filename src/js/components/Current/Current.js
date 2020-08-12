import React from 'react';
import CurrentCity from './City/city';
import CurrentInfo from './Info/info';

function Current (props) {
	return (
		<div className = 'Current'>
			<CurrentInfo    temperature = {props.current.temperature}
							weather = {props.current.weather}
							humidity = {props.current.humidity}
							wind = {props.current.wind}
			/>
			<CurrentCity 	city = {props.city}
							onCityChange = {props.onCityChange}
			/>
			<div className = 'CurrentBottom'></div>
		</div>
	);
}

export default Current;
