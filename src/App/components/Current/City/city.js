import React, {useState} from 'react';
import getWeather from '../../../api/get-weather';
import './city.scss';

function CurrentCity(props) {
	const defaultValue = 'Which city?';
	const [city, setCity] = useState(defaultValue);

	const handleChange = (e) => {
		setCity(e.target.value);
	}; 

	const handleFocus = () => {
		if (city === defaultValue) {
			setCity('');
		}	
	};

	const updateData = async (inputCity) => {
		props.toggleLoading(true);
		const newData = await getWeather(props.country, inputCity);
		if(newData === undefined) {
			props.toggleLoading(false);
			return alert('country or city can not found');
		}
		props.updateDataArray(newData);
		props.toggleLoading(false);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const validate = props.checkCityInput(city, props.country);
		if(validate) {
			updateData(city);
		}
		setCity(defaultValue);
	}

	const handleBlur = (e) => {
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