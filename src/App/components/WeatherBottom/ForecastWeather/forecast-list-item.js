import React from 'react';

function ForecastListItem (props) {
	const iconUrlAddress = `http://openweathermap.org/img/wn/${props.info.icon}@2x.png`;
	return (
		<div className = 'ForecastList__Item'>
			<h3 className = 'ForecastList__Item__day'>{props.info.day}</h3>
			<img className = 'ForecastList__Item__icon' src = {iconUrlAddress} alt = {props.info.description}/>
			<div className = 'ForecastList__Item__temperature'>{props.info.temperature} °</div>
		</div>
	);
}

export default ForecastListItem;