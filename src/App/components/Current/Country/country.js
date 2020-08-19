import React, {useState} from 'react';
import './country.scss';

function Country(props) {
    const defaultValue = 'country or code';
    const [hide, setHide] = useState(true); 
    const [country, setCountry] = useState(defaultValue);
    
    function toggleInput() {
        setHide(!hide);
        setCountry(defaultValue);    
    }

    function handleChange(e) {
        setCountry(e.target.value);
    }

    function handleFocus() {
        if (country === defaultValue) {
			setCountry('');
		}
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onCountryChange(country);
        toggleInput();
    }

    function handleBlur(e) {
        return (country === '')? toggleInput() : handleSubmit(e);
    }

    return (
        <div className = 'Country'>
            <div    className = 'Country__name'
                    onClick = {toggleInput}
            >
                {props.country}
            </div>
            {hide?
                ''
            :
                <form   className = 'Country__form'
                        onSubmit = {handleSubmit}
                >
                    <input  value = {country}
                            onChange = {handleChange}
                            onBlur = {handleBlur}
                            onFocus = {handleFocus}
                    />
                </form> 
            }   
        </div>
    );
}

export default Country;