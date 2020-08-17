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
		this.defaultCity = ['Melbourne', 'Sydney', 'Brisbane', 'Perth'];
		this.onCountryChange = this.onCountryChange.bind(this);
		this.onOtherCitiesClick = this.onOtherCitiesClick.bind(this);
		this.toggleLoading = this.toggleLoading.bind(this);
		this.checkCityInput =this.checkCityInput.bind(this);
		this.updateDataArray = this.updateDataArray.bind(this);
	}

	toggleLoading(booleanValue) {
		this.setState(
			{loading: booleanValue}
		);
	}

	setDataArray(newDataArray) {
		this.setState(
			{dataArray: newDataArray}
		);
	}

	checkCityInput(inputCity) {
		const index = this.state.dataArray.findIndex((data)=> {
			return (data.cityName.toUpperCase() === inputCity.toUpperCase()) &&
					(data.countryCode === this.state.countryCode);
		});

		if(index > 0 ) {
			this.onOtherCitiesClick(index - 1);
			console.log();
			return false;
		}else{
			return (index === 0)? false : true;
		}
	}

	updateDataArray(newData) {
		const newDataArray = this.state.dataArray.map((city) => city);
		newDataArray.unshift(newData);
		newDataArray.pop();
		this.setDataArray(newDataArray);
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
		const dataArrayIndex = index + 1;
		const newDataArray = this.state.dataArray.map((data) => data);
		const currentData = newDataArray.splice(dataArrayIndex, 1)[0];
		newDataArray.unshift(currentData);
		this.setDataArray(newDataArray);
		this.setState({
			countryCode : currentData.countryCode,
		});
	}

	async initialRequest (cityNameList = this.defaultCity) {
		this.toggleLoading(true);
		const {countryCode} = this.state;
		const dataArray = [];
		for(let i = 0; i < cityNameList.length; i++) {
			let city = cityNameList[i];
			let cityData = await getWeather(countryCode, city);
			dataArray.push(cityData);
		}
		this.setDataArray(dataArray);
		this.toggleLoading(false);
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
									checkCityInput = {this.checkCityInput}
									toggleLoading = {this.toggleLoading}
									updateDataArray = {this.updateDataArray}
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