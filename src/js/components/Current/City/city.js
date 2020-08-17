import React from 'react';
import {Component} from 'react';
import getWeather from '../../../api/get-weather';
import './city.scss';

class CurrentCity extends Component {
	constructor(props) {
		super(props);
		this.defaultValue = 'Which city?';
		this.state = {
			cityValue : this.defaultValue,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}

	updateDisplay(inputValue) {
		this.setState({
			cityValue: inputValue
		});
	}

	resetDisplay() {
		this.updateDisplay(this.defaultValue);
	}

	handleChange(e) {
		this.updateDisplay(e.target.value);
    }

	handleFocus(e) {
		if (this.state.cityValue === this.defaultValue) {
			this.updateDisplay('');
		}	
	}

	handleBlur(e) {
		return (this.state.cityValue === '') ?
			this.resetDisplay() :
			this.handleSubmit(e); 
	}

	handleSubmit(e) {
		e.preventDefault();
		const validate = this.props.checkCityInput(this.state.cityValue, this.props.country);
		if(validate) {
			this.updateData(this.state.cityValue);
		}
		this.resetDisplay();
	}
	
	async updateData(inputCity) {
		this.props.toggleLoading(true);
		const newData = await getWeather(this.props.country, inputCity);
		if(newData === undefined) {
			this.props.toggleLoading(false);
			return alert('country or city can not found');
		}
		this.props.updateDataArray(newData);
		this.props.toggleLoading(false);
	}

	render() {
		return (
			<div className = 'City'>
				<h1>{this.props.city}</h1>
				<form className='City__form' onSubmit={this.handleSubmit}>
					<input  className='City__form__input'
							value={this.state.cityValue}
							onChange={this.handleChange}
							onFocus={this.handleFocus}
							onBlur={this.handleBlur}
					/>
				</form>
			</div>
		);
	}
}

export default CurrentCity;