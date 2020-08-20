const units = require ('../services/unit');

class Weather {
	constructor(data) {
		this.temperature = units.toCelsius(data.main.temp);
		this.humidity = data.main.humidity;
		this.wind = data.wind.speed;
		this.weather = data.weather[0].main;
		this.icon = data.weather[0].icon;
		this.description = data.weather[0].description;
	}
}

class Forecast {
	constructor(data, day) {
		this.day = day;
		this.temperature = Math.round(data.temperature);
		this.icon = data.icon;
		this.description = data.description;
	}
}
export {Weather, Forecast};
