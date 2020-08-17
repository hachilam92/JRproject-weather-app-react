import React from 'react';
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
			countryCode: this.props.children.countryCode
		};
		this.onCountryChange = this.onCountryChange.bind(this);
	}

	updateCountryCode(newCode) {
		this.setState({
			countryCode: newCode
		});
	}
	
	componentDidUpdate(prevProps) {
		const newCountryCode = this.props.children.countryCode;
		const prevCountryCode = prevProps.children.countryCode;
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
		const {temperature, humidity, wind, weather} = this.props.children.current;
		const {cityName} = this.props.children;
		return (
			<div className = 'Current'>
				<Country 	country = {this.state.countryCode}
							onCountryChange = {this.onCountryChange}
				/>
				<CurrentInfo    temperature = {temperature}
								humidity = {humidity}
								wind = {wind}
								weather = {weather}		
				/>
				<CurrentCity 	city = {cityName}
								country = {this.state.countryCode}
								checkCityInput = {this.props.checkCityInput}
								toggleLoading = {this.props.toggleLoading}
								updateDataArray ={this.props.updateDataArray}
								onCityChange = {this.props.onCityChange}
				/>
				<div className = 'CurrentBottom'></div>
			</div>
		);
	}
}

export default Current;
