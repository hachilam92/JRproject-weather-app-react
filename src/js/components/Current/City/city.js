import React from 'react';
import {Component} from 'react';
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

	handleChange(e) {
		this.updateDisplay(e.target.value);
    }

	handleSubmit(e) {
		e.preventDefault();
		this.props.onCityChange(this.state.cityValue);
	}
	
	handleFocus(e) {
		if (this.state.cityValue === this.defaultValue) {
			this.updateDisplay('');
		}	
	}

	handleBlur(e) {
		if (this.state.cityValue === '') {
			this.updateDisplay(this.defaultValue);
		}	
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