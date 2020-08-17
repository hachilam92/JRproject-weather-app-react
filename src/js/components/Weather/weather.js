import React, {Component} from 'react';
import './weather.scss';
import Current from '../Current/current';
import WeatherBottom from '../WeatherBottom/weather-bottom';
import getWeather from '../../api/get-weather';

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
			loading : true,
			dataArray: []
		};
		this.defaultCountry = 'AU';
		this.defaultCity = ['Melbourne', 'Sydney', 'Brisbane', 'Perth'];
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

	checkCityInput(inputCity, inputCountry) {
		const index = this.state.dataArray.findIndex((data) => {
			return (data.cityName.toUpperCase() === inputCity.toUpperCase()) &&
					(data.countryCode === inputCountry);
		});
		if(index > 0 ) {
			this.onOtherCitiesClick(index - 1);
			return false;
		}else{
			return (index === 0)? false : true;
		}
	}

	//write new data: only pass in 'newData'
	//switch element order: only pass in 'index', switch position with the first element  
	updateDataArray(newData, index = null) {
		const newDataArray = this.state.dataArray.map((city) => city);
		const currentData = (index)? newDataArray.splice(index, 1)[0] : newData;
		newDataArray.unshift(currentData);
		if(newData){
			newDataArray.pop();
		}
		this.setDataArray(newDataArray);
	}

	onOtherCitiesClick(index) {
		const dataArrayIndex = index + 1;
		this.updateDataArray(undefined, dataArrayIndex);
	}

	async initialRequest () {
		this.toggleLoading(true);
		const cityNameList = this.defaultCity;
		const countryCode = this.defaultCountry;
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
		const {loading, dataArray} = this.state;
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
						<Current 	checkCityInput = {this.checkCityInput}
									toggleLoading = {this.toggleLoading}
									updateDataArray = {this.updateDataArray}
									onCountryChange = {this.onCountryChange}
						>
							{dataArray[currentCityIndex]}
						</Current>
						<WeatherBottom 	onOtherCitiesClick = {this.onOtherCitiesClick}
						>
							{dataArray}
						</WeatherBottom>
					</div>
				}
			</div>
		);
	}
}

export default Weather;