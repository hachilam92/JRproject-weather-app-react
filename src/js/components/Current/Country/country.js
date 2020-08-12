import React from 'react';
import {Component} from 'react';

class Country extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countryValue : props.country,
            hideInput : true
        };
    }

    render() {
        const {countryValue, hideInput} = this.state;
        return (
            <div className = 'Country'>
                <div>
                    {countryValue}
                </div>
                {hideInput?
                    <form>
                        <input/>
                    </form>
                    :
                    ''
                }     
            </div>
        );
    }
}