import React from 'react';
import OtherCityButton from './other-city-button';

function OtherCityButtons (props) {
    const cities = props.cityArray;
    const buttons = cities.map((city) => 
        <OtherCityButton    key = {`${city.countryCode}${city.cityName}`}
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

export default OtherCityButtons;