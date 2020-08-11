import React from 'react';
import CurrentCity from './City/city';
import CurrentInfo from './Info/info';

function Current (props) {
	const info = {
		city : props.current.city,
		temperature: props.current.temperature,
		weather: props.current.weather,
		humidity: props.current.humidity,
		wind: props.current.wind
	};
	return (
		<div className = 'Current'>
			<CurrentInfo info = {info}/>
			<CurrentCity 	city = {info.city}
							onCityChange = {props.onCityChange}
			/>
			<div className = 'CurrentBottom'></div>
		</div>
	);
}

export default Current;
