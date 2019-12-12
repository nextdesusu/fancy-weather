export default class UserConfig {
    constructor(){
        this.__currentLang = "ru";

        const city = "cityName";
        this.__city = city;
        //this.__weatherData = localStorage.get(`weather-data:${city}`);
    }
    updateWeatherData(){
        //const dateNow = new Date().now();
        
    }
}