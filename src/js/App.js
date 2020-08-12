import React, {Component} from 'react';
import '../css/App.css';
import Current from './components/Current/Current';
import WeatherBottom from './components/WeatherBottom/WeatherBottom';
import getWeather from './api/getWeather';
import {getCode, getName} from 'country-list';

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
		                                - countryCode 	
*/

class Weather extends Component {
	constructor (props) {
		super(props);
		this.state ={
			countryCode : 'AU', 
			city : 'Melbourne',
			data : null,
			loading : true,
			otherCities: []
		};
		this.onCityChange = this.onCityChange.bind(this);
		this.onCountryChange = this.onCountryChange.bind(this);
		this.onOtherCitiesClick = this.onOtherCitiesClick.bind(this);
	}

	checkCityInput(inputCity) {
		const index = this.state.otherCities.findIndex((city) => {
			return city.cityName.toUpperCase() === inputCity.toUpperCase();
		});
		if(index > 0){
			this.onOtherCitiesClick(this.state.otherCities[index].cityName);
			console.log('click');
			return false;
		}else{
			return (inputCity.toUpperCase() !== this.state.city.toUpperCase());
		}
	}

	async updateCity(inputCity) {
		this.setState({
			loading : true
		});
		const newData = await getWeather(this.state.countryCode, inputCity);
		if(newData === undefined) {
			this.setState({
				loading : false
			});
			return alert('country or city can not found');
		}
		const newCity = newData.cityName;
		const newOtherCities = this.state.otherCities.map((city) => city);
		newOtherCities.shift();
		newOtherCities.push(this.state.data);
		console.log('update');
		this.setState({
			city: newCity,
			data: newData,
			otherCities : newOtherCities,
			loading : false
		});
	}

	onCityChange(inputCity) {
		return this.checkCityInput(inputCity) && this.updateCity(inputCity);
	}

	getCountryCode(inputCountry) {
		return getCode(inputCountry) || false;
	}

	onCountryChange(inputCountry){
		const countryCode = this.getCountryCode(inputCountry);
		console.log(countryCode);
		if(countryCode) {
			this.setState({
				countryCode: countryCode
			});
		} 	
	}

	onOtherCitiesClick(selectedCity) {
		const newOtherCities = this.state.otherCities.map((city) => city);
		const selectedIndex = newOtherCities.findIndex((city) => city.cityName === selectedCity);
		const newData = newOtherCities.splice(selectedIndex, 1, this.state.data)[0];

		this.setState({
			data : newData,
			otherCities : newOtherCities
		});
	}

	async initialRequest () {
		this.setState({
			loading : true
		});
		const {countryCode: country, city} = this.state;
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
		const {countryCode, data, loading, otherCities} = this.state;
	
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
									country = {countryCode}
									onCityChange = {this.onCityChange}
									onCountryChange = {this.onCountryChange}
						/>
						<WeatherBottom 	cityArray = {otherCities}
										forecastArray = {data.forecast}
										onOtherCitiesClick = {this.onOtherCitiesClick}
						/>
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

