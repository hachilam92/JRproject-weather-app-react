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



function OtherCityButtons (props) {
    const cities = props.cityArray;
    const buttons = cities.map((city) => 
        <OtherCityButton    key = {city.cityName}
                            city = {city.cityName}
                            temperature = {city.current.temperature}
                            icon = {city.current.icon}
                            description = {city.current.description}
                            onOtherCitiesClick = {props.onOtherCitiesClick}  
         />
    );
    return (
        <div className = 'OtherCityButtons'>
            {buttons}
        </div>
    );
}


function OtherCity (props) {
    return (
        <div className = 'OtherCity'>
            <h2 className = 'OtherCity__title'>Other Cities</h2>
            <OtherCityButtons   cityArray = {props.cityArray}
                                onOtherCitiesClick = {props.onOtherCitiesClick}
            />
        </div>
    );
}

export default OtherCity;