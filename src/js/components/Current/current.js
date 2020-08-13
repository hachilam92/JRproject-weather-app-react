import React from 'react';
import './current.scss';
import Country from './Country/country';
import CurrentCity from './City/city';
import CurrentInfo from './Info/info';

function Current (props) {
	return (
		<div className = 'Current'>
			<Country 	country = {props.country}
						onCountryChange = {props.onCountryChange}
			/>
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
