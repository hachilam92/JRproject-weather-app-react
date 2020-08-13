import React from 'react';
import './info.scss';

function CurrentInfo (props) {
	return (
		<div className = 'CurrentInfo'>
			<div className = 'CurrentInfo__temperature'>
				<span>{props.temperature} °</span>
			</div>
			<div className = 'CurrentInfo__weather'>
				<span>{props.weather}</span>
			</div>
			<div className = 'CurrentInfo__details'>
				<div className = 'CurrentInfo__details__item'>
					<span>HUMIDITY</span>
					<br/>
					<span>{props.humidity}%</span>
				</div>
				<div className = 'division'></div>
				<div className = 'CurrentInfo__details__item'>
					<span>WIND</span>
					<br/>
					<span>{props.wind} K/M</span>
				</div>
			</div>
		</div>
	);
}

export default CurrentInfo;