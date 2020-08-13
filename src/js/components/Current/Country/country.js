import React from 'react';
import {Component} from 'react';
import './country.scss';

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
        this.toggleInput = this.toggleInput.bind(this);
    }

    toggleInput() {
        this.setState({
            hideInput : !this.state.hideInput,
            countryValue: this.defaultValue
        });
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
        this.toggleInput();
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
                <div    className = 'Country__name'
                        onClick = {this.toggleInput}
                >
                    {this.props.country}
                </div>
                {hideInput?
                    ''
                :
                    <form   className = 'Country__form'
                            onSubmit = {this.handleSubmit}
                    >
                        <input  value = {countryValue}
                                onChange = {this.handleChange}
                                onBlur = {this.handleBlur}
                                onFocus = {this.handleFocus}
                        />
                    </form> 
                }   
            </div>
        );
    }
}

export default Country;