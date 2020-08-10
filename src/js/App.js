import React, {Component} from 'react';
// import logo from '../logo.svg';
import '../App.css';
import Current from './components/Current/Current';
import WeatherBottom from './components/WeatherBottom/WeatherBottom';
import getWeather from './api/getWeather';

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





// function buildForecast (forecast) {
// 	const dayList = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
// 	let forecastList = [];
// 	let firstDay = new Date.getDay();
// 	forecastList.push({
// 		day : new ,
// 		temperature : 14,
// 		icon : '11d'
// 	});
// }


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
		const {city, data, loading} = this.state;
		let currentWeather;
		// let forecastWeather;
		// let otherCity;
		
		if(data) {
			currentWeather = {
				city : city,
				...data.current
			};
		}

		return (
			<div className = 'Weather'>
				{loading?
					<div className = 'Current'>
						<div className = 'loading'>
							Loading...
						</div>
					</div>
				:
					<Current current = {currentWeather}/>
				}
				<WeatherBottom cityArray = {otherCity} forecastArray = {forecastWeather}/>
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
