import React, {useState, useEffect} from 'react';
import './current.scss';
import {getCode, getName} from 'country-list';
import Country from './Country/country';
import CurrentCity from './City/city';
import CurrentInfo from './Info/info';


function Current(props) {
	const defaultValue = props.children.data.countryCode;
	const [countryCode, setCountryCode] = useState(defaultValue);

	useEffect(
		() => {
			setCountryCode(defaultValue);
		},
		[defaultValue]
	);

	const getCountryCode = (inputCountry) => {
		const countryCodeLength = 2;
		const validatedInput = getCode(inputCountry) || getName(inputCountry);
		if(validatedInput){
			return (validatedInput.length > countryCodeLength)? inputCountry : validatedInput; 
		}
		return false;
	}

	const onCountryChange = (inputCountry) => {
		const inputCode = getCountryCode(inputCountry);
		return inputCode && setCountryCode(inputCode.toUpperCase());
	}

	const {data, toggleLoading, checkCityInput, updateDataArray} = props.children;
	const {cityName, current} = data;
	const {temperature, humidity, wind, weather} = current;
	
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

export default Current;

