import React, {Component} from 'react';

class OtherCityButton extends Component {

    handleClick = (e) => {
        this.props.onOtherCitiesClick(this.props.city);
    };

    render() {
        const {city, temperature, icon, description} = this.props;
        
        return (
            <button className = 'OtherCityButton'
                    onClick = {this.handleClick}
            >
                <h3 className = 'OtherCityButton__city'>
                    {city}
                </h3>
                <div className = 'OtherCityButton__temperature'>
                    {Math.round(temperature)} °
                </div>
                <div className = 'OtherCityButton__icon'>
                    <img src ={`http://openweathermap.org/img/wn/${icon}.png`} alt = {description}/>
                </div>
            </button>
        );
    }
}

export default OtherCityButton;