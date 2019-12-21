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

    this.__longitudeNode = null;
    this.__map = null;

    this.__city = '';
    this.__country = '';
    this.__language = '';
    this.__measureScale = '';
    this.__tmp = {
      currentTemperature: new Array(days),
      feelsLike: new Array(days),
    };
    this.__coords = {
      latitude: 0,
      longitude: 0,
    };
  }

  async setRandomCityImage(city) {
    let cityName;
    if (city === null) cityName = this.__city;
    else cityName = city;
    try {
      const cityImage = await GetCityImage(cityName, IMAGE_KEY);
      const background = document.querySelector(`#${backgroundId}`);
      background.style.backgroundImage = `url(${cityImage})`;
    } catch (e) {
      console.log('Failed to get new city image!');
    }
  }

  async changeCity(cityName) {
    this.__city = cityName;
    const cityNameNode = document.querySelector(`#${cityNameId}`);
    cityNameNode.innerText = cityName;
    try {
      this.setRandomCityImage(cityName);
    } catch (e) {
      console.log('Failed to change city');
    }
  }

  translateTo(newLang) {
    const lang = newLang.toLowerCase();
    const toTranslate = document.querySelectorAll('[data-transl]');
    document.documentElement.lang = lang;
    Translate(lang, toTranslate);
    this.updateDate(lang);

    const inputNode = document.querySelector(`#${formInputId}`);
    inputNode.placeholder = getPlaceholderText(lang);

    const submitNode = document.querySelector(`#${formSubmitId}`);
    submitNode.value = getSubmitText(lang);

    const updateButton = document.querySelector(`#${UpdateButtonId}`);
    updateButton.innerText = getUpdateButtonText(lang);

    this.__language = lang;
    localStorage.setItem('weather-language', lang);
  }

  changeMeasureScale(newScale) {
    const nodesFeelsLike = document.querySelectorAll('[data-temp]');
    const nodesTemp = document.querySelectorAll('[data-feelsLike]');
    const scale = newScale.toLowerCase();
    const days = this.__daysOfprognose;
    const { currentTemperature, feelsLike } = this.__tmp;
    for (let day = 0; day < days; day += 1) {
      const tempNode = nodesTemp[day];
      const tempNodeScale = tempNode.getAttribute('[data-temp]');
      tempNode.innerText = SwapMeasureScale(tempNodeScale, newScale, currentTemperature[day]);

      const feelsLikeNode = nodesFeelsLike[day];
      const feelsLikeNodeScale = feelsLikeNode.getAttribute('[data-feelsLike]');
      feelsLikeNode.innerText = SwapMeasureScale(feelsLikeNodeScale, newScale, feelsLike[day]);
    }
    this.__measureScale = scale;
    localStorage.setItem('weather-scale', scale);
  }

  updateDate(lang) {
    const currentDate = new Date();
    const localeDate = currentDate.toLocaleDateString(lang);
    const currentDateNode = document.querySelector(`#${currentDateId}`);
    const headerNodes = document.querySelectorAll(`.${INDlistHeader}`);
    currentDateNode.innerText = localeDate;
    const currentDay = currentDate.getDay();
    const days = getDaysByLanguage(currentDay, lang);
    const daysOfprognose = this.__daysOfprognose;
    for (let day = 0; day < daysOfprognose; day++) {
      const curentDay = days[day];
      headerNodes[day].innerText = curentDay;
    }
  }

  updateIndicators(weatherData) {
    const days = this.__daysOfprognose;
    const tempNodes = document.querySelectorAll(`.${currentTemperatureIND}`);
    const tempStateNodes = document.querySelectorAll(`.${tempStateIND}`);
    const feelsLikeNodes = document.querySelectorAll(`.${feelsLikeIND}`);
    const windNodes = document.querySelectorAll(`.${windIND}`);
    const humidityNodes = document.querySelectorAll(`.${humidityIND}`);
    for (let day = 0; day < days; day++) {
      const dailyData = weatherData[day];
      const { main, weather, wind } = dailyData;
      tempNodes[day].innerText = main.temp;
      this.__tmp.currentTemperature[day] = main.temp;

      tempStateNodes[day].src = getImageUrl(weather[0].icon);
      tempStateNodes[day].alt = weather[0].main;

      feelsLikeNodes[day].innerText = main.feels_like;
      this.__tmp.feelsLike[day] = main.feels_like;

      windNodes[day].innerText = wind.speed;
      humidityNodes[day].innerText = main.humidity;
    }
  }

  async updateMap() {
    const { longitude, latitude } = this.__coords;
    const longitudeNode = document.querySelector(`#${longitudeId}`);
    const latitudeNode = document.querySelector(`#${latitudeId}`);
    longitudeNode.innerText = longitude;
    latitudeNode.innerText = latitude;
    try {
      if (this.__map === null) {
        this.__map = await createMap(MAP_KEY, mapContainerId, longitude, latitude);
      } else {
        this.__map.flyTo(longitude, latitude);
      }
    } catch (e) {
      console.log('Failed to update map!');
      console.log(e);
      console.log(this.__map);
    }
  }

  async getCityLocation(cityName) {
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

    const listBlocks = document.querySelectorAll(`.${INDlistBlock}`);
    const updateButton = document.querySelector(`#${UpdateButtonId}`);
    const searchInput = document.querySelector(`#${formInputId}`);
    const searchButton = document.querySelector(`#${formSubmitId}`);
    const langOptionsNode = document.querySelector(`#${langOptionsId}`);
    const langOptions = langOptionsNode.options;
    const measureUnits = document.querySelectorAll(`[name=${measureUnitsName}]`);

    updateButton.onclick = () => {
      this.setRandomCityImage(null);
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
