import React from 'react';
import './other-cities.scss';
import OtherCityButtons from './other-city-buttons';

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