import React from 'react';
import {Component} from 'react';

class Country extends Component {
    constructor(props) {
        super(props);
        this.defaultValue = 'Change country?';
        this.state = {
            countryValue : this.defaultValue,
            hideInput : true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    updateDisplay(inputValue) {
		this.setState({
			countryValue: inputValue
		});
    }
    
    handleChange(e) {
        this.updateDisplay(e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onCountryChange(this.state.countryValue);
    }

    handleFocus(e) {
		if (this.state.countryValue === this.defaultValue) {
			this.updateDisplay('');
		}	
	}

	handleBlur(e) {
		if (this.state.countryValue === '') {
			this.updateDisplay(this.defaultValue);
		}	
	}

    render() {
        const {countryValue, hideInput} = this.state;
        return (
            <div className = 'Country'>
                <div className = 'Country__name'>
                    {this.props.country}
                </div>
                <form   className = 'Country__form'
                        onSubmit = {this.handleSubmit}
                >
                    <input  value = {countryValue}
                            onChange = {this.handleChange}
                            onBlur = {this.handleBlur}
                            onFocus = {this.handleFocus}
                    />
                </form>    
            </div>
        );
    }
}

export default Country;