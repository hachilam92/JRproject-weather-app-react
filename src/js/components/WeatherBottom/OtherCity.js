import React from 'react';

function OtherCityButton (props) {
    const iconUrlAddress = `http://openweathermap.org/img/wn/${props.info.icon}.png`;
    return (
        <button className = 'OtherCityButton'>
            <h3 className = 'OtherCityButton__city'>
                {props.city}
            </h3>
            <div className = 'OtherCityButton__temperature'>
                {Math.round(props.info.temperature)} °
            </div>
            <div className = 'OtherCityButton__icon'>
                <img src ={iconUrlAddress} alt = {props.info.description}/>
            </div>
        </button>
    );
}

function OtherCityButtons (props) {
    const cities = props.cityArray;
    const buttons = cities.map((city) => 
        <OtherCityButton    key = {city.cityName}
                            info = {city.current}
                            city = {city.cityName}  
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
            <OtherCityButtons cityArray = {props.cityArray}/>
        </div>
    );
}

export default OtherCity;