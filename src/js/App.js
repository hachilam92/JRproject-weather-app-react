import React, {Component} from 'react';
// import logo from '../logo.svg';
import '../App.css';
import Current from './components/Current/Current';
import WeatherBottom from './components/WeatherBottom/WeatherBottom';
import getWeather from './api/getWeather';
require('dotenv').config();
/* hierarchy
weather
|-current
|    |-city
|    |-weather-info
|    |-input
|-forecast
|    |-title
|    |-info-list
-other city
     |-city list
*/


const forecastWeather = [
	{
		day : 'MON',
		icon : '11d',
		temperature : 9
	},
	{
		day : 'MON',
		icon : '11d',
		temperature : 9
	},
	{
		day : 'MON',
		icon : '11d',
		temperature : 9
	},
	{
		day : 'MON',
		icon : '11d',
		temperature : 9
	},
	{
		day : 'MON',
		icon : '11d',
		temperature : 9
	}
];

const otherCity = [
	{
		city : 'Perth',
		temperature : 14,
		icon : '11d'
	},
	{
		city : 'Perth',
		temperature : 14,
		icon : '11d'
	},
	{
		city : 'Perth',
		temperature : 14,
		icon : '11d'
	}
];


// icon image:http://openweathermap.org/img/wn/<icon-code>@2x.png

function buildForecast (forecast) {
	const dayList = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
	const today = new Date;
	let forecastList = [];
	let currentIndex = today.getDay();
	forecastList.push({
		day : dayList[currentIndex],
		temperature : forecast[0].temperature,
		icon : forecast[0].icon
	});
	for (let i = 1; i < 5; i++) {
		currentIndex = (currentIndex === dayList.length -1)? 0 : currentIndex + 1;
		forecastList.push({
			day : dayList[currentIndex],
			temperature : forecast[i].temperature,
			icon : forecast[i].icon
		});
	}
	console.log(`forecastList = ${forecastList}`);
	return forecastList;
}


class Weather extends Component {
	constructor (props) {
		super(props);
		this.state ={
			country : 'au', 
			city : 'Melbourne',
			data : null,
			loading : true,
		};
	}

	async requestWeather () {
		this.setState({
			loading : true
		});
		const {country, city} = this.state;
		const data = await getWeather(country, city);
		this.setState({
			data : data,
			loading : false
		});
	}

	componentDidMount() {
		this.requestWeather();
	}


	render () {
		const {city, data} = this.state;
		let currentWeather;
		let forecastWeather;
		const loading = true;
		// let otherCity;
		
		if(data) {
			currentWeather = {
				city : city,
				...data.current
			};
			forecastWeather = buildForecast(data.forecast);
		}

		return (
			<div className = 'Weather'>
				{loading?
					<div className = 'Current'>
						<div className = 'loading'>
							Loading...
						</div>
						<div className = 'WeatherBottom'></div>
					</div>
				:
					<div>
						<Current current = {currentWeather}/>
						<WeatherBottom cityArray = {otherCity} forecastArray = {forecastWeather}/>
					</div>
				}
			</div>
		);
	}
}


function App() {
	return (
		<div className = 'App'>
			<Weather/>
		</div>
	);
}


export default App;
