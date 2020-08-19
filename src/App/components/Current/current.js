import React, {useState, useEffect} from 'react';
import './current.scss';
import {getCode, getName} from 'country-list';
import Country from './Country/country';
import CurrentCity from './City/city';
import CurrentInfo from './Info/info';


function Current(props) {
	const defaultValue = props.children.currentData.countryCode;
	const [countryCode, setCountryCode] = useState(defaultValue);

	useEffect(
		() => {
			setCountryCode(defaultValue);
		},
		[defaultValue]
	);

	function getCountryCode (inputCountry) {
		const countryCodeLength = 2;
		const validatedInput = getCode(inputCountry) || getName(inputCountry);
		if(validatedInput){
			return (validatedInput.length > countryCodeLength)? inputCountry : validatedInput; 
		}
		return false;
	}

	function onCountryChange (inputCountry) {
		const inputCode = getCountryCode(inputCountry);
		return inputCode && setCountryCode(inputCode.toUpperCase());
	}

	const {currentData, setLoading, checkCityInput, updateDataArray} = props.children;
	const {cityName, current} = currentData;
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
							setLoading = {setLoading}
							updateDataArray ={updateDataArray}
			/>
			<div className = 'CurrentBottom'></div>
		</div>
	);
}

export default Current;

