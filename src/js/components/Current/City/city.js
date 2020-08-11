import React from 'react';
import {Component} from 'react';

class CurrentCity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cityValue : 'Which city?',
		};
		this.handleCityChange = this.handleCityChange.bind(this);
        this.handleCitySubmit = this.handleCitySubmit.bind(this);
	}

	handleCityChange(e) {
		this.setState({
			cityValue: e.target.value
		});
    }

	handleCitySubmit(e) {
		e.preventDefault();
		this.props.onCityChange(this.state.cityValue);
    }

	render() {
		return (
			<div className = 'City'>
				<h1>{this.props.city}</h1>
				<form className='City__form' onSubmit={this.handleCitySubmit}>
					<input  className='City__form__input'
							value={this.state.cityValue}
							onChange={this.handleCityChange}
					/>
				</form>
			</div>
		);
	}
}

export default CurrentCity;