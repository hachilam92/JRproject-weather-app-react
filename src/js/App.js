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


class Weather extends Component {
	constructor (props) {
		super(props);
		this.state ={
			country : 'au', 
			city : 'Melbourne',
			data : null,
			loading : true,
		};
		this.onCityChange = this.onCityChange.bind(this);
		this.requestWeather = this.requestWeather.bind(this);
	}

	async onCityChange(inputCity) {
		if(inputCity !== this.state.city){
			const data = await getWeather(this.state.country, inputCity);
			const newCity = data.cityName;
			this.setState({
				city: newCity,
				data: data 
			});
		}
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
		const loadingStyle = {
			borderRadius : '32px',
		};
		const {city, data, loading} = this.state;
		let currentWeather;
		let forecastWeather;
		// let otherCity;
		
		if(data) {
			currentWeather = {
				city : city,
				...data.current
			};
			forecastWeather = data.forecast;
		}

		return (
			<div className = 'Weather'>
				{loading?
					<div className = 'Current' style = {loadingStyle}>
						<div className = 'loading'>
							Loading...
						</div>
					</div>
				:
					<div>
						<Current 	current = {currentWeather}
									onCityChange = {this.onCityChange}
						/>
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
