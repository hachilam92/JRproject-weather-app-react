import React from 'react';
import {Component} from 'react';

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

// function CurrentCity (props) {

// 	return (
// 		<div className = 'City'>
// 			<h1>{props.city}</h1>	
// 		</div>
// 		<fieldset>
// 			<input  value='Which city?'
// 					onChange=
// 			/>
// 		</fieldset>
// 	);
// }

class CurrentCity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value : 'Which city?'
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({
			value: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.onCityChange(this.state.value);
		console.log('submit');
		console.log(this.state.value);
	}

	render() {
		return (
			<div className = 'City'>
				<h1>{this.props.city}</h1>
				<form onSubmit={this.handleSubmit}>
					<input  value={this.state.value}
							onChange={this.handleChange}
					/>
				</form>	
			</div>
		);
	}
}

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
