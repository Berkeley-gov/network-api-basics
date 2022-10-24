import fetch from 'node-fetch';
import Geolocation from '../geolocation/Geolocation.js';

const localLocation = new Geolocation();

export default class Weather  {
    constructor() {}

    async runWeatherDiagnostics() {
        const newLocation = Object.assign({}, await localLocation.runGeoLocation());

        const latitude = newLocation['0'];
        const longitude = newLocation['1'];

        try {
            let forecast = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7ad1e232567d41df8f7135329220910&q=${latitude}, ${longitude}&days=1&aqi=yes&alerts=yes`)
                        .then(response => response.json())
                        .then(json => json)

            const date = forecast.forecast.forecastday[0].date;
            const airQuality = forecast.forecast.forecastday[0].day.air_quality;
            const weatherConditions = forecast.forecast.forecastday[0].day.condition;
            const weatherForecast = forecast.forecast.forecastday[0].day;
            const weatherAlerts = forecast.alerts;
            const weatherForecastDetails = {
                maxTempature: weatherForecast.maxtemp_f,
                minTempature: weatherForecast.mintemp_f,
                avgTempature: weatherForecast.avgtemp_f,
                maxwindMPH: weatherForecast.maxwind_mph,
                avgHumidity: weatherForecast.avghumidity
            };

            console.log(`\n--- WEATHER FORECAST ${date} ---`);
            console.table(weatherConditions);
            console.table(weatherForecastDetails);

            console.log(`\n--- CURRENT AIR QUALITY ${date}---`);
            console.table(airQuality);

            console.log(`\n--- WEATHER ALERTS ${date}`);
            console.log(weatherAlerts.alert.length !== 0 ? weatherAlerts : { alert: 'No weather alerts for today.'});
        } catch {
            console.log('error on the weather object')
        }
    }
}