import React from 'react';
import OtherCityButton from './other-city-button';

function OtherCityButtons (props) {
	const {cityArray, onOtherCitiesClick} = props;
	const buttons = cityArray.map((city, index) => 
		<OtherCityButton    
			key = {`${city.countryCode}${city.cityName}`}
			city = {city.cityName}
			temperature = {city.current.temperature}
			icon = {city.current.icon}
			description = {city.current.description}
			onOtherCitiesClick = {onOtherCitiesClick}
			index = {index}  
		/>
	);
	return (
		<div className = 'OtherCityButtons'>
			{buttons}
		</div>
	);
}

export default OtherCityButtons;