function toCelsius (Kelvin) {
    let Celsius = Kelvin - 273.15;
    Celsius = xDigits(Celsius);
    return Celsius;
}

function toFahrenheit (Kelvin) {
    let Fahrenheit = 9 * (Kelvin - 273.15) / 5 + 32;
    Fahrenheit = xDigits(Fahrenheit);
    return Fahrenheit;
}

// default to two digits
function xDigits (number, x = 2) {
    let formatted = Math.round(number * 10**x) / 10**x;
    return formatted;
}

function windDirect (windDegree) {
    const directionList = ["N", "NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"];
    const directionGap = 22.5;
    const offset = directionGap/2;   //11.25 degree
    const indexMapping = parseInt((windDegree + offset) / directionGap) + 1;
    let direction = directionList[indexMapping];
    return direction; 
}

module.exports = {
    toCelsius,
    toFahrenheit,
    windDirect
};