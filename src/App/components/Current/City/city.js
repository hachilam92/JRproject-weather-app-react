import React, {useState} from 'react';
import getWeather from '../../../api/get-weather';
import './city.scss';

function CurrentCity(props) {
	const defaultValue = 'Which city?';
	const [city, setCity] = useState(defaultValue);

	function handleChange(e) {
		setCity(e.target.value);
	}; 

	function handleFocus () {
		if (city === defaultValue) {
			setCity('');
		}	
	};

	async function updateData(inputCity) {
		props.setLoading(true);
		const newData = await getWeather(props.country, inputCity);
		if(newData === undefined) {
			props.setLoading(false);
			return alert('country or city can not found');
		}
		props.updateDataArray(newData);
		props.setLoading(false);
	}

	function handleSubmit(e) {
		e.preventDefault();
		const validate = props.checkCityInput(city, props.country);
		if(validate) {
			updateData(city);
		}
		setCity(defaultValue);
	}

	function handleBlur (e){
		return (city === '') && setCity(defaultValue);
	}

	return (
		<div className = 'City'>
			<h1>{props.city}</h1>
			<form className='City__form' onSubmit={handleSubmit}>
				<input  className='City__form__input'
						value={city}
						onChange={handleChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
				/>
			</form>
		</div>
	);
}

export default CurrentCity;