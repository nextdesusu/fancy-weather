import Markdown from "./Markdown";
import {
    backgroundId,
    UpdateButtonId,
    langOptionsId,
    measureUnitsName,
    formId,
    formInputId,
    formSubmitId,
    cityNameId,
    currentDateId,
    currentTemperatureId,
    tempStateIND,
    feelsLikeIND,
    windIND,
    humidityIND,
    latitudeId,
    longitudeId
} from "./NodeData";
import { TEN_MINUTES } from "./Consts";
import { GetWeatherData, GetLocation, GetCityImage, createMap } from "./SideAPI";
import { WEATHER_KEY, LOCATION_KEY, IMAGE_KEY, MAP_KEY } from "./SecretKeys";
import Translate from "./Translate";

export default class WeatherApp {
    constructor(rootNode, days){
        this.__root = rootNode;
        this.__daysOfprognose = days;
        this.__background = null;
        this.__cityNameNode = null;
        this.__currentDateNode = null;
        this.__tempNode = null;

        this.__tempStateNodes = null;
        this.__feelsLikeNodes = null;
        this.__windNodes = null;
        this.__humidityNodes = null;
        this.__latitudeNode = null;
        this.__longitudeNode = null;

        this.__map = null;

        this.__city = "";
        this.__country = "";
        this.__language = "RU";
        this.__measureScale = "CEL";
        this.__coords = {
            latitude: 0,
            longitude: 0
        };
    }

    async setRandomCityImage(){
        const cityName = this.__city;
        const cityImage = await GetCityImage(cityName, IMAGE_KEY);
        this.__background.style.backgroundImage = `url(${cityImage})`;
    }

    async changeCity(cityName){
        this.__city = cityName;
        this.__cityNameNode.innerText = cityName;
        //this.setRandomCityImage();
        //working but should be turned on in final version!!!
    }

    translateTo(newLang){
        const lang = newLang.toLowerCase();
        document.documentElement.lang = lang;
        console.log(newLang, "==", document.documentElement.lang);
    }

    updateDate(){
        const currentDate = new Date();
        const language = this.__language;
        const localeDate = currentDate.toLocaleDateString(language);
        this.__currentDateNode.innerText = localeDate;
    }

    updateIndicators(weatherData){
        const days = this.__daysOfprognose;
        for (let day = 0; day < days; day++){
            const dailyData = weatherData[day];
            const { main, weather, wind } = dailyData;
            //this.__tempNodes[day].innerText = main.temp;
            this.__tempStateNodes[day].innerText = weather[0].main;
            this.__feelsLikeNodes[day].innerText = main.feels_like;
            this.__windNodes[day].innerText = wind.speed;
            this.__humidityNodes[day].innerText = main.humidity;
        }
    }

    async updateMap(){
        const { latitude, longitude } = this.__coords;
        this.__latitudeNode.innerText = latitude;
        this.__longitudeNode.innerText = longitude;
        if (this.__map === null){
            const newMap = createMap(MAP_KEY, latitude, longitude)
            this.__map = newMap;
        }
    }

    async updateWeather(city){
        const cityName = city.toLowerCase();

        await this.changeCity(cityName);

        let weatherData = JSON.parse(localStorage.getItem(`weather-city:${cityName}`));
        this.__dateOfQuery = localStorage.getItem("dateOfQuery");
        const dateNow = Date.now();
        const dateOfQuery = localStorage.getItem("dateOfQuery");
        if ((dateNow - dateOfQuery) > TEN_MINUTES || weatherData === null){
            /*If ten minutes passs since previous request 
            i have to made a new one because weather is updated*/
            const language = this.__language;
            const query = await GetWeatherData(cityName, language, WEATHER_KEY);
            //console.log("all data is:", query);
            const newData = query.list.filter(reading => reading.dt_txt.includes("03:00:00"));
            const newDate = Date.now();
            localStorage.setItem(`weather-city:${cityName}`, JSON.stringify(newData));
            localStorage.setItem("dateOfQuery", newDate);
            
            weatherData = newData;
            //console.log("updated");
        } else {
            //console.log("not updated");
        }
        this.updateIndicators(weatherData);
        this.setRandomCityImage();
        //console.log(weatherData);
    }

    async getCurrentPosition(){
        const posOptions = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        const succes = (crd) => {
            const coords = crd.coords;
            //console.log("coords:", coords)
            this.__coords.latitude = coords.latitude;
            this.__coords.longitude = coords.longitude;
            this.updateMap();
            console.log(this.__coords)
        };
        const error = (err) => console.log("error:", err);
        navigator.geolocation.getCurrentPosition(succes, error, posOptions);
    }

    async init(){
        const cityQuery = await GetLocation(LOCATION_KEY);

        this.__root.appendChild(Markdown);
        this.__background = document.querySelector(`#${backgroundId}`);
        this.__cityNameNode = document.querySelector(`#${cityNameId}`);
        this.__currentDateNode = document.querySelector(`#${currentDateId}`);
        this.__tempNode = document.querySelector(`#${currentTemperatureId}`);

        this.__tempStateNodes = document.querySelectorAll(`.${tempStateIND}`);
        this.__feelsLikeNodes = document.querySelectorAll(`.${feelsLikeIND}`);
        this.__windNodes = document.querySelectorAll(`.${windIND}`);
        this.__humidityNodes = document.querySelectorAll(`.${humidityIND}`);
        this.__latitudeNode = document.querySelector(`#${latitudeId}`);
        this.__longitudeNode = document.querySelector(`#${longitudeId}`);

        const updateButton = document.querySelector(`#${UpdateButtonId}`);
        const searchInput = document.querySelector(`#${formInputId}`);
        const searchButton = document.querySelector(`#${formSubmitId}`);
        const langOptionsNode = document.querySelector(`#${langOptionsId}`);
        const langOptions = langOptionsNode.options;
        const measureUnits = document.querySelectorAll(`[name=${measureUnitsName}]`);

        updateButton.onclick = () => {
            //update image!
            this.setRandomCityImage();
        }

        const currentLanguage = this.__language;
        for (let option of langOptions){
            if (option.value === currentLanguage){
                option.selected = true;
                break;
            }
        }

        const measureScale = this.__measureScale;
        for (let unit of measureUnits){
            if (unit.value === measureScale){
                unit.checked = true;
            }
            unit.onclick = () => {
                console.log(unit.value);
            }
        }

        searchButton.onclick = (e) => {
            e.preventDefault();
            const cityName = searchInput.value;
            this.updateWeather(cityName);
        }

        langOptionsNode.onchange = () => {
            const index = langOptions.selectedIndex;
            const selectedLanguage = langOptions[index].value;
            console.log(selectedLanguage)
        }

        const locationCity = cityQuery.city;
        this.updateWeather(locationCity);
        //const toTranslate = document.querySelectorAll(`[data-transl='1']`);
        //Translate("ru", toTranslate);
        this.getCurrentPosition();
        this.updateDate();
        this.translateTo("RU");
    }
}