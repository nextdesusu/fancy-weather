/* eslint-disable no-undef */
import Map from './MapAPI';

export async function GetWeatherData(city, lang, accesKey) {
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${accesKey}`;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang}&units=metric&APPID=${accesKey}`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

export async function GetLocation(accesKey) {
  const url = `https://ipinfo.io/json?token=${accesKey}`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

export async function GetCityImage(cityName, accesKey) {
  const url = `https://api.unsplash.com/photos/random?query=town,${cityName}&client_id=${accesKey}`;
  const urls = await fetch(url);
  const json = await urls.json();
  const blob = await json.urls.small;
  return blob;
}

export async function createMap(accesKey, containerId, lng, lat) {
  const pointSize = 250;
  const animatonLast = 2000;
  const startingZoom = 2;
  const map = new Map(accesKey, containerId, pointSize, animatonLast, startingZoom, lng, lat);
  return map;
}

export function getImageUrl(iconName) {
  return `http://openweathermap.org/img/wn/${iconName}@2x.png`;
}

export async function getLocationByCityName(accesKey, cityName) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=${accesKey}&pretty=1&no_annotations=1`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
}
