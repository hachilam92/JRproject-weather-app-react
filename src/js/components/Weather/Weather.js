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
			loading : true,
			dataArray: []
		};
		this.onCityChange = this.onCityChange.bind(this);
		this.onCountryChange = this.onCountryChange.bind(this);
		this.onOtherCitiesClick = this.onOtherCitiesClick.bind(this);
	}


	checkCityInput(inputCity) {
		const index = this.state.dataArray.findIndex((data)=> {
			return (data.cityName.toUpperCase() === inputCity.toUpperCase()) &&
					(data.countryCode === this.state.countryCode);
		});

		if(index > 0 ) {
			this.onOtherCitiesClick(index -1);
			return false;
		}else{
			return (index === 0)? false : true;
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
		const newDataArray = this.state.dataArray.map((city) => city);
		newDataArray.unshift(newData);
		newDataArray.pop();
		this.setState({
			dataArray: newDataArray,
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

	onOtherCitiesClick(index) {
		const selectedIndex = index + 1;
		const selectedData = this.state.dataArray[selectedIndex];
		const newDataArray = this.state.dataArray.map((data) => data);
		newDataArray.splice(selectedIndex, 1);
		newDataArray.unshift(selectedData);
		const currentData = newDataArray[0];
		
		this.setState({
			dataArray: newDataArray,
			countryCode : currentData.countryCode,
			city: currentData.cityName
		});
	}

	async initialRequest () {
		this.setState({
			loading : true
		});
		const {countryCode} = this.state;
		const cityNameList = ['Melbourne', 'Sydney', 'Brisbane', 'Perth'];
		const cityList = [];
		for(let i = 0; i < cityNameList.length; i++) {
			let city = cityNameList[i];
			let cityData = await getWeather(countryCode, city);
			cityList.push(cityData);
		}
		this.setState({
			dataArray : cityList,
			loading : false,
		});
	}

	componentDidMount() {
		this.initialRequest();
	}

	render () {
		const loadingStyle = {
			borderRadius : '32px',
		};
		const {countryCode, loading, dataArray} = this.state;
		const currentCityIndex = 0;
	
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
						<Current 	current = {dataArray[currentCityIndex].current}
									city = {dataArray[currentCityIndex].cityName}
									country = {countryCode}
									onCityChange = {this.onCityChange}
									onCountryChange = {this.onCountryChange}
						/>
						<WeatherBottom 	cityArray = {dataArray.slice(currentCityIndex + 1, dataArray.length)}
										forecastArray = {dataArray[currentCityIndex].forecast}
										onOtherCitiesClick = {this.onOtherCitiesClick}
						/>
					</div>
				}
			</div>
		);
	}
}

export default Weather;