import React, {useState} from 'react';
import {Component} from 'react';
import './current.scss';
import {getCode, getName} from 'country-list';
import Country from './Country/country';
import CurrentCity from './City/city';
import CurrentInfo from './Info/info';


class Current extends Component {
	constructor(props) {
		super(props);
		this.state = {
			countryCode: this.props.children.data.countryCode
		};
		this.onCountryChange = this.onCountryChange.bind(this);
	}

	updateCountryCode(newCode) {
		this.setState({
			countryCode: newCode
		});
	}
	
	componentDidUpdate(prevProps) {
		const newCountryCode = this.props.children.data.countryCode;
		const prevCountryCode = prevProps.children.data.countryCode;
		if( newCountryCode !== prevCountryCode) {
			this.updateCountryCode(newCountryCode);
		}
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
			this.updateCountryCode(countryCode.toUpperCase());
		} 	
	}
	
	render() {
		const {data, toggleLoading, checkCityInput, updateDataArray} = this.props.children;
		const {cityName, current} = data;
		const {temperature, humidity, wind, weather} = current;

		const {countryCode} = this.state;
		const {onCountryChange} = this;

		return (
			<div className = 'Current'>
				<Country 	country = {countryCode}
							onCountryChange = {onCountryChange}
				/>
				<CurrentInfo    temperature = {temperature}
								humidity = {humidity}
								wind = {wind}
								weather = {weather}		
				/>
				<CurrentCity 	city = {cityName}
								country = {countryCode}
								checkCityInput = {checkCityInput}
								toggleLoading = {toggleLoading}
								updateDataArray ={updateDataArray}
				/>
				<div className = 'CurrentBottom'></div>
			</div>
		);
	}
}

export default Current;
