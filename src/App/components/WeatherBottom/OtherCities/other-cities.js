import React from 'react';
import './other-cities.scss';
import OtherCityButtons from './other-city-buttons';

function OtherCity (props) {
	const {cityArray, onOtherCitiesClick} = props.children;
	return (
		<div className = 'OtherCity'>
			<h2 className = 'OtherCity__title'>Other Cities</h2>
			<OtherCityButtons
			  cityArray = {cityArray}
				onOtherCitiesClick = {onOtherCitiesClick}
			/>
		</div>
	);
}

export default OtherCity;