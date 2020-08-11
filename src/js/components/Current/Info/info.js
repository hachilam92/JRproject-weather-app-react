import React from 'react';

function CurrentInfo (props) {
	return (
		<div className = 'CurrentInfo'>
			<div className = 'CurrentInfo__temperature'>
				<span>{props.info.temperature} °</span>
			</div>
			<div className = 'CurrentInfo__weather'>
				<span>{props.info.weather}</span>
			</div>
			<div className = 'CurrentInfo__details'>
				<div className = 'CurrentInfo__details__item'>
					<span>HUMIDITY</span>
					<br/>
					<span>{props.info.humidity}%</span>
				</div>
				<div className = 'division'></div>
				<div className = 'CurrentInfo__details__item'>
					<span>WIND</span>
					<br/>
					<span>{props.info.wind} K/M</span>
				</div>
			</div>
		</div>
	);
}

export default CurrentInfo;