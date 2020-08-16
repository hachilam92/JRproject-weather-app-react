import React, {Component} from 'react';
import './weather.scss';
import Current from '../Current/current';
import WeatherBottom from '../WeatherBottom/weather-bottom';
import getWeather from '../../api/get-weather';
import {getCode, getName} from 'country-list';

/* data format									
data
	- cityName
	- current
		temperature	
		humidity
		wind
		weather
		icon
		description
	- forecast[0]-[4] (same a current)
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
		const cityArray = this.state.otherCities;
		const index = cityArray.findIndex((city) => {
			return (city.cityName.toUpperCase() === inputCity.toUpperCase()) &&
				(city.countryCode === this.state.countryCode);
		});

		const cityNameDiff = (inputCity.toUpperCase() !== this.state.city.toUpperCase());
		const countryCodeDiff = (this.state.data.countryCode !== this.state.countryCode);

		if(index >= 0){
			this.onOtherCitiesClick(cityArray[index].cityName);
			return false;
		}else{
			return (cityNameDiff || countryCodeDiff);
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
		const countryCodeLength = 2;
		const validatedInput = getCode(inputCountry) || getName(inputCountry);
		if(validatedInput){
			return (validatedInput.length > countryCodeLength)? inputCountry : validatedInput; 
		}
		return false;
	}

	onCountryChange(inputCountry){
		const countryCode = this.getCountryCode(inputCountry);
		if(countryCode) {
			this.setState({
				countryCode: countryCode.toUpperCase()
			});
		} 	
	}

	onOtherCitiesClick(selectedCity) {
		const newOtherCities = this.state.otherCities.map((city) => city);
		const selectedIndex = newOtherCities.findIndex((city) => city.cityName === selectedCity);
		const newData = newOtherCities.splice(selectedIndex, 1, this.state.data)[0];
		const newCountryCode = newData.countryCode; 

		this.setState({
			data : newData,
			otherCities : newOtherCities,
			countryCode : newCountryCode,
			city: newData.cityName
		});
	}

	async initialRequest () {
		this.setState({
			loading : true
		});
		const {countryCode, city} = this.state;
		const currentData = await getWeather(countryCode, city);
		const otherCityNameList = ['Sydney', 'Brisbane', 'Perth'];
		const otherCityList = [];
		for(let i = 0; i < otherCityNameList.length; i++) {
			let city = otherCityNameList[i];
			let otherCityData = await getWeather(countryCode, city);
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

export default Weather;