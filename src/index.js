/* eslint-disable no-undef */
import WeatherApp from './WeatherApp';

const BODY = document.querySelector('body');
const QUANTITY_OF_DAYS_TO_MAKE_PROGNOSE = 3;
const APP = new WeatherApp(BODY, QUANTITY_OF_DAYS_TO_MAKE_PROGNOSE);
APP.init();
