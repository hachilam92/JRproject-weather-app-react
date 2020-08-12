import React from 'react';
import {Component} from 'react';

class CurrentCity extends Component {
	constructor(props) {
		super(props);
		this.defaultValue = 'Which city?';
		this.state = {
			cityValue : this.defaultValue,
		};
		this.handleCityChange = this.handleCityChange.bind(this);
		this.handleCitySubmit = this.handleCitySubmit.bind(this);
		this.updateDisplay = this.updateDisplay.bind(this);
		this.handleCityFocus = this.handleCityFocus.bind(this);
		this.handleCityBlur = this.handleCityBlur.bind(this);
	}

	updateDisplay(inputValue) {
		this.setState({
			cityValue: inputValue
		});
	}

	handleCityChange(e) {
		this.updateDisplay(e.target.value);
    }

	handleCitySubmit(e) {
		e.preventDefault();
		this.props.onCityChange(this.state.cityValue);
	}
	
	handleCityFocus(e) {
		if (this.state.cityValue === this.defaultValue) {
			this.updateDisplay('');
		}	
	}

	handleCityBlur(e) {
		if (this.state.cityValue === '') {
			this.updateDisplay(this.defaultValue);
		}	
	}

	render() {
		return (
			<div className = 'City'>
				<h1>{this.props.city}</h1>
				<form className='City__form' onSubmit={this.handleCitySubmit}>
					<input  className='City__form__input'
							value={this.state.cityValue}
							onChange={this.handleCityChange}
							onFocus={this.handleCityFocus}
							onBlur={this.handleCityBlur}
					/>
				</form>
			</div>
		);
	}
}

export default CurrentCity;