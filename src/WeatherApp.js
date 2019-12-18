/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import Markdown from './Markdown';
import {
  backgroundId,
  UpdateButtonId,
  langOptionsId,
  measureUnitsName,
  formInputId,
  formSubmitId,
  cityNameId,
  currentDateId,
  INDlistBlock,
  INDlistHeader,
  currentTemperatureIND,
  tempStateIND,
  feelsLikeIND,
  windIND,
  humidityIND,
  latitudeId,
  longitudeId,
  mapContainerId,
} from './NodeData';
import {
  GetWeatherData, GetLocation, GetCityImage, createMap, getImageUrl, getLocationByCityName,
} from './SideAPI';
import {
  WEATHER_KEY, LOCATION_KEY, IMAGE_KEY, MAP_KEY, GEOCODE_KEY,
} from './SecretKeys';
import {
  Translate, getDaysByLanguage, getPlaceholderText, getSubmitText, getUpdateButtonText,
} from './Translate';
import SwapMeasureScale from './SwapMeasureScale';

const TEN_MINUTES = 600000;

export default class WeatherApp {
  constructor(rootNode, days) {
    this.__root = rootNode;
    this.__daysOfprognose = days;

    this.__background = null;
    this.__cityNameNode = null;
    this.__currentDateNode = null;
    this.__listHeaders = null;

    this.__tempNodes = null;
    this.__tempStateNodes = null;
    this.__feelsLikeNodes = null;
    this.__windNodes = null;
    this.__humidityNodes = null;
    this.__latitudeNode = null;
    this.__longitudeNode = null;
    this.__map = null;

    this.__city = '';
    this.__country = '';
    this.__language = '';
    this.__measureScale = '';
    this.__coords = {
      latitude: 0,
      longitude: 0,
    };
  }

  async setRandomCityImage() {
    const cityName = this.__city;
    try {
      const cityImage = await GetCityImage(cityName, IMAGE_KEY);
      this.__background.style.backgroundImage = `url(${cityImage})`;
    } catch (e) {
      console.log('Failed to get new city image!');
    }
  }

  async changeCity(cityName) {
    this.__city = cityName;
    this.__cityNameNode.innerText = cityName;
    this.setRandomCityImage();
  }

  translateTo(newLang) {
    const lang = newLang.toLowerCase();
    document.documentElement.lang = lang;
    const toTranslate = document.querySelectorAll('[data-transl]');
    Translate(lang, toTranslate);
    this.__language = lang;
    localStorage.setItem('weather-language', lang);
    this.updateDate(lang);

    const inputNode = document.querySelector(`#${formInputId}`);
    inputNode.placeholder = getPlaceholderText(lang);

    const submitNode = document.querySelector(`#${formSubmitId}`);
    submitNode.value = getSubmitText(lang);

    const updateButton = document.querySelector(`#${UpdateButtonId}`);
    updateButton.innerText = getUpdateButtonText(lang);
  }

  changeMeasureScale(newScale) {
    const nodes = document.querySelectorAll('[data-temp]');
    const scale = newScale.toLowerCase();
    for (const node of nodes) {
      const oldScale = node.getAttribute('');
      const value = node.innerText;
      node.innerText = `${SwapMeasureScale(oldScale, scale, value)}`;
    }
    this.__measureScale = scale;
    localStorage.setItem('weather-scale', scale);
  }

  updateDate(lang) {
    const currentDate = new Date();
    const localeDate = currentDate.toLocaleDateString(lang);
    this.__currentDateNode.innerText = localeDate;
    const headerNodes = document.querySelectorAll(`.${INDlistHeader}`);
    const days = getDaysByLanguage(lang);
    const currentDay = currentDate.getDay();
    const daysOfprognose = this.__daysOfprognose;
    const daysHeaders = days.slice(currentDay, currentDay + daysOfprognose);
    for (let day = 0; day < daysOfprognose; day++) {
      const curentDay = daysHeaders[day];
      headerNodes[day].innerText = curentDay;
    }
  }

  updateIndicators(weatherData) {
    const days = this.__daysOfprognose;
    for (let day = 0; day < days; day++) {
      const dailyData = weatherData[day];
      const { main, weather, wind } = dailyData;
      this.__tempNodes[day].innerText = main.temp;
      this.__tempStateNodes[day].src = getImageUrl(weather[0].icon);
      this.__tempStateNodes[day].alt = weather[0].main;
      this.__feelsLikeNodes[day].innerText = main.feels_like;
      this.__windNodes[day].innerText = wind.speed;
      this.__humidityNodes[day].innerText = main.humidity;
    }
  }

  async updateMap() {
    const { latitude, longitude } = this.__coords;
    this.__latitudeNode.innerText = latitude;
    this.__longitudeNode.innerText = longitude;
    try {
      createMap(MAP_KEY, mapContainerId, latitude, longitude);
    } catch (e) {
      console.log('Failed to locate!');
    }
  }

  async getCityLocation(cityName){
    try {
      const query = await getLocationByCityName(GEOCODE_KEY, cityName);
      const coords = query.results[0].geometry;
      this.__coords = {
        latitude: coords.lat,
        longitude: coords.lng,
      };
      this.updateMap();
    } catch (e) {
      console.log('Failed to get city location!');
    }
  }

  async updateWeather(city, initial) {
    const cityName = city.toLowerCase();
    await this.changeCity(cityName);
    const measureScale = this.__measureScale;

    let weatherData = JSON.parse(localStorage.getItem(`weather-city:${cityName}`));
    this.__dateOfQuery = localStorage.getItem('dateOfQuery');
    const dateNow = Date.now();
    const dateOfQuery = localStorage.getItem('dateOfQuery');
    if ((dateNow - dateOfQuery) > TEN_MINUTES || weatherData === null) {
      /* If ten minutes passs since previous request
            i have to made a new one because weather is updated */
      const language = this.__language;
      const query = await GetWeatherData(cityName, language, WEATHER_KEY);
      if (query.cod !== '200') {
        console.log(query.message);
        return;
      }
      const newData = query.list.filter((reading) => reading.dt_txt.includes('03:00:00'));
      const newDate = Date.now();
      localStorage.setItem(`weather-city:${cityName}`, JSON.stringify(newData));
      localStorage.setItem('dateOfQuery', newDate);
      weatherData = newData;
    }
    this.updateIndicators(weatherData);
    this.changeMeasureScale(measureScale);
    if (initial) this.getCurrentPosition();
    else this.getCityLocation(cityName);
  }

  async getCurrentPosition() {
    const posOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const succes = (crd) => {
      const { coords } = crd;
      this.__coords.latitude = coords.latitude;
      this.__coords.longitude = coords.longitude;
      this.updateMap();
    };
    const error = (err) => console.log('error:', err);
    navigator.geolocation.getCurrentPosition(succes, error, posOptions);
  }

  async init() {
    const cityQuery = await GetLocation(LOCATION_KEY);
    const language = localStorage.getItem('weather-language') || 'ru';
    const measureScale = localStorage.getItem('weather-scale') || 'c';

    this.__language = language;
    this.__measureScale = measureScale;

    this.__root.appendChild(Markdown);
    this.__background = document.querySelector(`#${backgroundId}`);
    this.__cityNameNode = document.querySelector(`#${cityNameId}`);
    this.__currentDateNode = document.querySelector(`#${currentDateId}`);

    const listBlocks = document.querySelectorAll(`.${INDlistBlock}`);
    this.__listHeaders = document.querySelectorAll(`.${INDlistHeader}`);
    this.__tempNodes = document.querySelectorAll(`.${currentTemperatureIND}`);
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
      // update image!
      this.setRandomCityImage();
    };

    for (const option of langOptions) {
      if (option.value === language.toUpperCase()) {
        option.selected = true;
        break;
      }
    }

    for (const unit of measureUnits) {
      if (unit.value === measureScale.toLowerCase()) {
        unit.checked = true;
      }
      unit.onclick = () => {
        this.changeMeasureScale(unit.value);
      };
    }

    searchButton.onclick = (e) => {
      e.preventDefault();
      const cityName = searchInput.value;
      this.updateWeather(cityName, false);
    };

    langOptionsNode.onchange = () => {
      const index = langOptions.selectedIndex;
      const selectedLanguage = langOptions[index].value.toLowerCase();
      this.translateTo(selectedLanguage);
    };

    for (const block of listBlocks) {
      block.onmouseover = () => {
        block.classList.add('focused-block');
      };
      block.onmouseout = () => {
        block.classList.remove('focused-block');
      };
    }

    const locationCity = cityQuery.city;
    this.updateWeather(locationCity, true);
    const currentLang = this.__language;
    this.translateTo(currentLang);
  }
}