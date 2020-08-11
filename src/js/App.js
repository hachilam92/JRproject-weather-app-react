import React, {Component} from 'react';
// import logo from '../logo.svg';
import '../App.css';
import Current from './components/Current/Current';
import WeatherBottom from './components/WeatherBottom/WeatherBottom';
import getWeather from './api/getWeather';
require('dotenv').config();
/* hierarchy
weather								data
	|-current							- cityName
	|    |-city							- current
	|    |-weather-info						temperature	
	|    |-input							humidity
	|-forecast								wind
	|    |-title							weather	
	|    |-info-list						icon		
	-other city								description
		|-city list						- forecast[0]-[4] (same a current) 	
*/

class Weather extends Component {
	constructor (props) {
		super(props);
		this.state ={
			country : 'Australia', 
			city : 'Melbourne',
			data : null,
			loading : true,
			otherCities: []
		};
		this.onCityChange = this.onCityChange.bind(this);
		this.initialRequest = this.initialRequest.bind(this);
	}

	async onCityChange(inputCity) {
		if(inputCity !== this.state.city){
			const newData = await getWeather(this.state.country, inputCity);
			const newCity = newData.cityName;
			this.setState({
				city: newCity,
				data: newData,
			});
		}
	}

	// onOtherCitiesClick(e) {
	// 	const newCurrent = e.target.
	// }

	async initialRequest () {
		this.setState({
			loading : true
		});
		const {country, city} = this.state;
		const currentData = await getWeather(country, city);
		const otherCityNameList = ['Sydney', 'Brisbane', 'Perth'];
		const otherCityList = [];
		for(let i = 0; i < otherCityNameList.length; i++) {
			let city = otherCityNameList[i];
			let otherCityData = await getWeather(country, city);
			otherCityList.push(otherCityData);
		}
		this.setState({
			data : currentData,
			loading : false,
			otherCities : otherCityList
		});
	}

	componentDidMount() {
		this.initialRequest();
	}

	render () {
		const loadingStyle = {
			borderRadius : '32px',
		};
		const {data, loading, otherCities} = this.state;
	
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
						<Current 	current = {data.current}
									city = {data.cityName}
									onCityChange = {this.onCityChange}
									onCountryChange = {this.onCountryChange}
						/>
						<WeatherBottom cityArray = {otherCities} forecastArray = {data.forecast}/>
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
