import React from 'react';

function OtherCityButton (props) {
    const iconUrlAddress = `http://openweathermap.org/img/wn/${props.info.icon}.png`;
    return (
        <button className = 'OtherCityButton'>
            <h3 className = 'OtherCityButton__city'>
                {props.info.city}
            </h3>
            <div className = 'OtherCityButton__temperature'>
                {props.info.temperature} °
            </div>
            <div className = 'OtherCityButton__icon'>
                <img src ={iconUrlAddress} alt = '{props.info.icon}'/>
            </div>
        </button>
    );
}

function OtherCityButtons (props) {
    const cities = props.cityArray;
    const buttons = cities.map((city) => 
        <OtherCityButton info = {city}/>
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
            <OtherCityButtons cityArray = {props.cityArray}/>
        </div>
    );
}

export default OtherCity;