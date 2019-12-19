(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/MapAPI.js":
/*!***********************!*\
  !*** ./src/MapAPI.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* eslint-disable no-undef */\n/* eslint-disable no-underscore-dangle */\n/* eslint-disable max-classes-per-file */\nclass PulsingDot {\n  constructor(map, size, duration) {\n    this.__map = map;\n    this.__size = size;\n    this.__width = size;\n    this.__height = size;\n    this.__duration = duration;\n    this.__data = new Uint8Array(size * size * 4);\n    this.__context = null;\n  }\n\n  get width() {\n    return this.__width;\n  }\n\n  get height() {\n    return this.__height;\n  }\n\n  get data() {\n    return this.__data;\n  }\n\n  onAdd() {\n    const canvas = document.createElement('canvas');\n    canvas.width = this.__width;\n    canvas.height = this.__height;\n    this.__context = canvas.getContext('2d');\n  }\n\n  render() {\n    const size = this.__size;\n    const duration = this.__duration;\n    const t = (performance.now() % duration) / duration;\n    const radius = (size / 2) * 0.3;\n    const outerRadius = (size / 2) * 0.7 * t + radius;\n    const context = this.__context;\n\n    // draw outer circle\n    context.clearRect(0, 0, this.__width, this.__height);\n    context.beginPath();\n    context.arc(\n      this.__width / 2,\n      this.__height / 2,\n      outerRadius,\n      0,\n      Math.PI * 2,\n    );\n    context.fillStyle = `rgba(255, 200, 200, ${(1 - t)})`;\n    context.fill();\n\n    // draw inner circle\n    context.beginPath();\n    context.arc(\n      this.__width / 2,\n      this.__height / 2,\n      radius,\n      0,\n      Math.PI * 2,\n    );\n    context.fillStyle = 'rgba(255, 100, 100, 1)';\n    context.strokeStyle = 'white';\n    context.lineWidth = 2 + 4 * (1 - t);\n    context.fill();\n    context.stroke();\n\n    // update this image's data with data from the canvas\n    this.__data = context.getImageData(\n      0,\n      0,\n      this.__width,\n      this.__height,\n    ).data;\n    // continuously repaint the map, resulting in the smooth animation of the dot\n    this.__map.triggerRepaint();\n    // return `true` to let the map know that the image was updated\n    return true;\n  }\n}\n\nclass Map {\n  constructor(accesKey, containerId, pointSize, animationLasts, startingZoom, lng, lat) {\n    mapboxgl.accessToken = accesKey;\n    const map = new mapboxgl.Map({\n      container: containerId,\n      style: 'mapbox://styles/mapbox/streets-v9',\n      center: [lng, lat], // starting position [lng, lat]\n      zoom: startingZoom, // starting zoom\n    });\n    const pulsingDot = new PulsingDot(map, pointSize, animationLasts);\n    map.on('load', () => {\n      map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });\n      map.addLayer({\n        id: 'points',\n        type: 'symbol',\n        source: {\n          type: 'geojson',\n          data: {\n            type: 'FeatureCollection',\n            features: [\n              {\n                type: 'Feature',\n                geometry: {\n                  type: 'Point',\n                  coordinates: [lng, lat],\n                },\n              },\n            ],\n          },\n        },\n        layout: {\n          'icon-image': 'pulsing-dot',\n        },\n      });\n    });\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Map);\n\n\n//# sourceURL=webpack:///./src/MapAPI.js?");

/***/ }),

/***/ "./src/Markdown.js":
/*!*************************!*\
  !*** ./src/Markdown.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _NodeData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NodeData */ \"./src/NodeData.js\");\n/* eslint-disable no-undef */\n\n\nconst md = `\n    <div class=\"app-header\">\n        <div class=\"settings\">\n            <button data-transl=\"update\" class=\"settings__elem\" id=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"UpdateButtonId\"]}\">Update</button>\n            <select id=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"langOptionsId\"]}\" class=\"settings__elem lang-list\">\n                <option value=\"EN\">EN</option>\n                <option value=\"RU\">RU</option>\n            </select>\n            <div class=\"settings__elem checkbox-wrapper\">\n                <label class=\"checkbox-container\">\n                    <span>c</span>\n                    <input value=\"c\" class=\"checkbox-elem\" type=\"radio\" name=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"measureUnitsName\"]}\">\n                    <span class=\"checkbox-checkmark\"></span>\n                </label>\n                <label class=\"checkbox-container\">\n                    <span>f</span>\n                    <input value=\"f\" class=\"checkbox-elem\" type=\"radio\" name=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"measureUnitsName\"]}\">\n                    <span class=\"checkbox-checkmark\"></span>\n                </label>\n            </div>\n        </div>\n        <form class=\"settings__elem form\" id=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"formId\"]}\" action=\"/\" method=\"GET\">\n            <input required type=\"text\" id=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"formInputId\"]}\" class=\"form__input\" placeholder=\"Search city or ZIP\">\n            <input id=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"formSubmitId\"]}\" class=\"form__submit\" type=\"submit\">\n        </form>\n    </div>\n    <div class=\"app-main\">\n        <div class=\"info\">\n            <h1 id=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"cityNameId\"]}\" class=\"info-header\"></h1>\n            <h3 id=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"currentDateId\"]}\" class=\"info-date\"></h3>\n            <div class=\"inidicators-wrapper\">\n                <div class=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"INDlistBlock\"]}\">\n                    <h2 class=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"INDlistHeader\"]}\"></h2>\n                    <h3 data-temp=\"c\" class=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"currentTemperatureIND\"]}\"></h3>\n                    <img class=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"tempStateIND\"]}\" src=\"\">\n                    <ul class=\"inidicators-list\">\n                        <li class=\"inidicators-item\">\n                            <span data-transl=\"feelsLike\"></span>\n                            <span data-temp=\"c\" class=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"feelsLikeIND\"]}\"></span>\n                        </li>\n                        <li class=\"inidicators-item\">\n                            <span data-transl=\"wind\"></span>\n                            <span class=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"windIND\"]}\"></span>\n                        </li>\n                        <li class=\"inidicators-item\">\n                            <span data-transl=\"humidity\">\n                            </span><span class=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"humidityIND\"]}\"></span>\n                        </li>\n                    </ul>\n                </div>\n                <div class=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"INDlistBlock\"]}\">\n                    <h2 class=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"INDlistHeader\"]}\"></h2>\n                    <h3 data-temp=\"c\" class=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"currentTemperatureIND\"]}\"></h3>\n                    <img class=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"tempStateIND\"]}\" src=\"\">\n                    <ul class=\"inidicators-list\">\n                        <li class=\"inidicators-item\">\n                            <span data-transl=\"feelsLike\"></span>\n                            <span data-temp=\"c\" class=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"feelsLikeIND\"]}\"></span>\n                        </li>\n                        <li class=\"inidicators-item\">\n                            <span data-transl=\"wind\"></span>\n                            <span class=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"windIND\"]}\"></span>\n                        </li>\n                        <li class=\"inidicators-item\">\n                            <span data-transl=\"humidity\"></span>\n                            <span class=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"humidityIND\"]}\"></span>\n                        </li>\n                    </ul>\n                </div>\n                <div class=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"INDlistBlock\"]}\">\n                    <h2 class=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"INDlistHeader\"]}\"></h2>\n                    <h3 data-temp=\"c\" class=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"currentTemperatureIND\"]}\"></h3>\n                    <img class=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"tempStateIND\"]}\" src=\"\">\n                    <ul class=\"inidicators-list\">\n                        <li class=\"inidicators-item\">\n                            <span data-transl=\"feelsLike\"></span>\n                            <span data-temp=\"c\" class=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"feelsLikeIND\"]}\"></span>\n                        </li>\n                        <li class=\"inidicators-item\">\n                            <span data-transl=\"wind\"></span>\n                            <span class=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"windIND\"]}\"></span>\n                        </li>\n                        <li class=\"inidicators-item\">\n                            <span data-transl=\"humidity\"></span>\n                            <span class=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"humidityIND\"]}\"></span>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n        <div class=\"map-container\">\n            <div id=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"mapContainerId\"]}\" class=\"map\"></div>\n            <div class=\"map-coordinates\">\n                <ul class=\"coordinates-list\">\n                    <li class=\"coordinates-item\">\n                        <span data-transl=\"latitude\"></span>\n                        <span id=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"latitudeId\"]}\"></span>\n                    </li>\n                    <li class=\"coordinates-item\">\n                        <span data-transl=\"logitude\"></span>\n                        <span id=\"${_NodeData__WEBPACK_IMPORTED_MODULE_0__[\"longitudeId\"]}\"></span>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n`;\n\nconst Markdown = document.createElement('div');\nMarkdown.innerHTML = md;\nMarkdown.id = _NodeData__WEBPACK_IMPORTED_MODULE_0__[\"backgroundId\"];\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Markdown);\n\n\n//# sourceURL=webpack:///./src/Markdown.js?");

/***/ }),

/***/ "./src/NodeData.js":
/*!*************************!*\
  !*** ./src/NodeData.js ***!
  \*************************/
/*! exports provided: backgroundId, UpdateButtonId, langOptionsId, measureUnitsName, formId, formInputId, formSubmitId, cityNameId, currentDateId, INDlistBlock, INDlistHeader, currentTemperatureIND, tempStateIND, feelsLikeIND, windIND, humidityIND, latitudeId, longitudeId, mapContainerId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"backgroundId\", function() { return backgroundId; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UpdateButtonId\", function() { return UpdateButtonId; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"langOptionsId\", function() { return langOptionsId; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"measureUnitsName\", function() { return measureUnitsName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"formId\", function() { return formId; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"formInputId\", function() { return formInputId; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"formSubmitId\", function() { return formSubmitId; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cityNameId\", function() { return cityNameId; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"currentDateId\", function() { return currentDateId; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"INDlistBlock\", function() { return INDlistBlock; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"INDlistHeader\", function() { return INDlistHeader; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"currentTemperatureIND\", function() { return currentTemperatureIND; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tempStateIND\", function() { return tempStateIND; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"feelsLikeIND\", function() { return feelsLikeIND; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"windIND\", function() { return windIND; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"humidityIND\", function() { return humidityIND; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"latitudeId\", function() { return latitudeId; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"longitudeId\", function() { return longitudeId; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mapContainerId\", function() { return mapContainerId; });\nconst backgroundId = 'backgroundId';\nconst UpdateButtonId = 'UpdateButtonId';\nconst langOptionsId = 'langOptionsId';\nconst measureUnitsName = 'measureUnitsName';\nconst formId = 'formId';\nconst formInputId = 'formInputId';\nconst formSubmitId = 'formSubmitId';\nconst cityNameId = 'cityNameId';\nconst currentDateId = 'currentDateId';\nconst INDlistBlock = 'INDlistBlock';\nconst INDlistHeader = 'INDlistHeader';\nconst currentTemperatureIND = 'currentTemperatureIND';\nconst tempStateIND = 'tempStateIND';\nconst feelsLikeIND = 'feelsLikeIND';\nconst windIND = 'windIND';\nconst humidityIND = 'humidityIND';\nconst latitudeId = 'latitudeId';\nconst longitudeId = 'logitudeId';\nconst mapContainerId = 'mapContainerId';\n\n\n//# sourceURL=webpack:///./src/NodeData.js?");

/***/ }),

/***/ "./src/SecretKeys.js":
/*!***************************!*\
  !*** ./src/SecretKeys.js ***!
  \***************************/
/*! exports provided: WEATHER_KEY, LOCATION_KEY, IMAGE_KEY, MAP_KEY, GEOCODE_KEY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WEATHER_KEY\", function() { return WEATHER_KEY; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LOCATION_KEY\", function() { return LOCATION_KEY; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"IMAGE_KEY\", function() { return IMAGE_KEY; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MAP_KEY\", function() { return MAP_KEY; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GEOCODE_KEY\", function() { return GEOCODE_KEY; });\nconst WEATHER_KEY = 'b337884c51dfe2c971db7e082be5b260';\nconst LOCATION_KEY = '9c913eee10fe5f';\nconst IMAGE_KEY = 'bc085475580b97ac4b8c3ba2bef1f29c1076f42df3b01d1581d3b43d3adbc2d3';\nconst MAP_KEY = 'pk.eyJ1IjoibmV4dGRlc3VzdSIsImEiOiJjazQzNG1id3AwM3YzM2tvNXZud2F1bzRlIn0.gK4BsmrHPOswlc5EKIk8Tw';\nconst GEOCODE_KEY = 'f0d3728f71354779a068cadb73cbf24c';\n\n\n//# sourceURL=webpack:///./src/SecretKeys.js?");

/***/ }),

/***/ "./src/SideAPI.js":
/*!************************!*\
  !*** ./src/SideAPI.js ***!
  \************************/
/*! exports provided: GetWeatherData, GetLocation, GetCityImage, createMap, getImageUrl, getLocationByCityName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GetWeatherData\", function() { return GetWeatherData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GetLocation\", function() { return GetLocation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GetCityImage\", function() { return GetCityImage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createMap\", function() { return createMap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getImageUrl\", function() { return getImageUrl; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getLocationByCityName\", function() { return getLocationByCityName; });\n/* harmony import */ var _MapAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MapAPI */ \"./src/MapAPI.js\");\n/* eslint-disable no-undef */\n\n\nasync function GetWeatherData(city, lang, accesKey) {\n  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${accesKey}`;\n  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang}&units=metric&APPID=${accesKey}`;\n  const response = await fetch(url);\n  const json = await response.json();\n  return json;\n}\n\nasync function GetLocation(accesKey) {\n  const url = `https://ipinfo.io/json?token=${accesKey}`;\n  const response = await fetch(url);\n  const json = await response.json();\n  return json;\n}\n\nasync function GetCityImage(cityName, accesKey) {\n  const url = `https://api.unsplash.com/photos/random?query=town,${cityName}&client_id=${accesKey}`;\n  const urls = await fetch(url);\n  const json = await urls.json();\n  const blob = await json.urls.small;\n  return blob;\n}\n\nasync function createMap(accesKey, containerId, lng, lat) {\n  const pointSize = 250;\n  const animatonLast = 2000;\n  const startingZoom = 2;\n  const map = new _MapAPI__WEBPACK_IMPORTED_MODULE_0__[\"default\"](accesKey, containerId, pointSize, animatonLast, startingZoom, lng, lat);\n  return map;\n}\n\nfunction getImageUrl(iconName) {\n  return `http://openweathermap.org/img/wn/${iconName}@2x.png`;\n}\n\n\nasync function getLocationByCityName(accesKey, cityName) {\n  const url = `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=${accesKey}&pretty=1&no_annotations=1`;\n  const response = await fetch(url);\n  const json = await response.json();\n  return json;\n}\n\n\n//# sourceURL=webpack:///./src/SideAPI.js?");

/***/ }),

/***/ "./src/SwapMeasureScale.js":
/*!*********************************!*\
  !*** ./src/SwapMeasureScale.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SwapMeasureScale; });\nfunction toCel(far) {\n  return ((far - 32) * 5) / 9;\n}\n\nfunction toFar(cel) {\n  return ((cel * 9) / 5) + 32;\n}\n\nfunction SwapMeasureScale(from, to, value) {\n  if (from === to) return value;\n  let res = 0;\n  switch (to) {\n    case 'f':\n      res = toFar(value);\n      break;\n    case 'c':\n      res = toCel(value);\n      break;\n    default:\n      throw Error(`Unknown scale: ${to}`);\n  }\n  return res.toFixed(2);\n}\n\n\n//# sourceURL=webpack:///./src/SwapMeasureScale.js?");

/***/ }),

/***/ "./src/Translate.js":
/*!**************************!*\
  !*** ./src/Translate.js ***!
  \**************************/
/*! exports provided: Translate, getDaysByLanguage, getPlaceholderText, getSubmitText, getUpdateButtonText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Translate\", function() { return Translate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getDaysByLanguage\", function() { return getDaysByLanguage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getPlaceholderText\", function() { return getPlaceholderText; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSubmitText\", function() { return getSubmitText; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getUpdateButtonText\", function() { return getUpdateButtonText; });\n/* eslint-disable no-restricted-syntax */\nconst RU = {\n  feelsLike: 'по ощущениям',\n  wind: 'ветер',\n  humidity: 'влажность',\n  latitude: 'широта',\n  logitude: 'долгота',\n};\n\nconst EN = {\n  feelsLike: 'feels like',\n  wind: 'wind',\n  humidity: 'humidity',\n  latitude: 'latitude',\n  logitude: 'logitude',\n};\n\nconst daysRu = ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'];\nconst daysEn = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];\n\nfunction changeLang(translateTo, nodes) {\n  for (const node of nodes) {\n    const key = node.getAttribute('data-transl');\n    const val = translateTo[key];\n    if (val !== undefined) {\n      node.innerText = `${val}: `;\n    }\n  }\n}\n\nfunction Translate(lang, nodes) {\n  switch (lang) {\n    case 'ru':\n      changeLang(RU, nodes);\n      break;\n    case 'en':\n      changeLang(EN, nodes);\n      break;\n    default:\n      throw Error(`Unknown lang: ${lang}`);\n  }\n}\n\nfunction getDaysByLanguage(lang) {\n  switch (lang) {\n    case 'ru':\n      return daysRu;\n    case 'en':\n      return daysEn;\n    default:\n      throw Error(`Unknown lang: ${lang}`);\n  }\n}\n\nfunction getPlaceholderText(lang) {\n  switch (lang) {\n    case 'ru':\n      return 'Введите название города';\n    case 'en':\n      return 'Input city name';\n    default:\n      throw Error(`Unknown lang: ${lang}`);\n  }\n}\n\nfunction getSubmitText(lang) {\n  switch (lang) {\n    case 'ru':\n      return 'Отправить';\n    case 'en':\n      return 'Submit';\n    default:\n      throw Error(`Unknown lang: ${lang}`);\n  }\n}\n\nfunction getUpdateButtonText(lang) {\n  switch (lang) {\n    case 'ru':\n      return 'Обновить';\n    case 'en':\n      return 'Update';\n    default:\n      throw Error(`Unknown lang: ${lang}`);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/Translate.js?");

/***/ }),

/***/ "./src/WeatherApp.js":
/*!***************************!*\
  !*** ./src/WeatherApp.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return WeatherApp; });\n/* harmony import */ var _Markdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Markdown */ \"./src/Markdown.js\");\n/* harmony import */ var _NodeData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NodeData */ \"./src/NodeData.js\");\n/* harmony import */ var _SideAPI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SideAPI */ \"./src/SideAPI.js\");\n/* harmony import */ var _SecretKeys__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SecretKeys */ \"./src/SecretKeys.js\");\n/* harmony import */ var _Translate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Translate */ \"./src/Translate.js\");\n/* harmony import */ var _SwapMeasureScale__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SwapMeasureScale */ \"./src/SwapMeasureScale.js\");\n/* eslint-disable no-console */\n/* eslint-disable import/no-unresolved */\n/* eslint-disable no-restricted-syntax */\n/* eslint-disable no-plusplus */\n/* eslint-disable no-underscore-dangle */\n/* eslint-disable no-undef */\n\n\n\n\n\n\n\nconst TEN_MINUTES = 600000;\n\nclass WeatherApp {\n  constructor(rootNode, days) {\n    this.__root = rootNode;\n    this.__daysOfprognose = days;\n\n    this.__background = null;\n    this.__cityNameNode = null;\n    this.__currentDateNode = null;\n    this.__listHeaders = null;\n\n    this.__tempNodes = null;\n    this.__tempStateNodes = null;\n    this.__feelsLikeNodes = null;\n    this.__windNodes = null;\n    this.__humidityNodes = null;\n    this.__latitudeNode = null;\n    this.__longitudeNode = null;\n    this.__map = null;\n\n    this.__city = '';\n    this.__country = '';\n    this.__language = '';\n    this.__measureScale = '';\n    this.__coords = {\n      latitude: 0,\n      longitude: 0,\n    };\n  }\n\n  async setRandomCityImage() {\n    const cityName = this.__city;\n    try {\n      const cityImage = await Object(_SideAPI__WEBPACK_IMPORTED_MODULE_2__[\"GetCityImage\"])(cityName, _SecretKeys__WEBPACK_IMPORTED_MODULE_3__[\"IMAGE_KEY\"]);\n      this.__background.style.backgroundImage = `url(${cityImage})`;\n    } catch (e) {\n      console.log('Failed to get new city image!');\n    }\n  }\n\n  async changeCity(cityName) {\n    this.__city = cityName;\n    this.__cityNameNode.innerText = cityName;\n    this.setRandomCityImage();\n  }\n\n  translateTo(newLang) {\n    const lang = newLang.toLowerCase();\n    document.documentElement.lang = lang;\n    const toTranslate = document.querySelectorAll('[data-transl]');\n    Object(_Translate__WEBPACK_IMPORTED_MODULE_4__[\"Translate\"])(lang, toTranslate);\n    this.__language = lang;\n    localStorage.setItem('weather-language', lang);\n    this.updateDate(lang);\n\n    const inputNode = document.querySelector(`#${_NodeData__WEBPACK_IMPORTED_MODULE_1__[\"formInputId\"]}`);\n    inputNode.placeholder = Object(_Translate__WEBPACK_IMPORTED_MODULE_4__[\"getPlaceholderText\"])(lang);\n\n    const submitNode = document.querySelector(`#${_NodeData__WEBPACK_IMPORTED_MODULE_1__[\"formSubmitId\"]}`);\n    submitNode.value = Object(_Translate__WEBPACK_IMPORTED_MODULE_4__[\"getSubmitText\"])(lang);\n\n    const updateButton = document.querySelector(`#${_NodeData__WEBPACK_IMPORTED_MODULE_1__[\"UpdateButtonId\"]}`);\n    updateButton.innerText = Object(_Translate__WEBPACK_IMPORTED_MODULE_4__[\"getUpdateButtonText\"])(lang);\n  }\n\n  changeMeasureScale(newScale) {\n    const nodes = document.querySelectorAll('[data-temp]');\n    const scale = newScale.toLowerCase();\n    for (const node of nodes) {\n      const oldScale = node.getAttribute('');\n      const value = node.innerText;\n      node.innerText = `${Object(_SwapMeasureScale__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(oldScale, scale, value)}`;\n    }\n    this.__measureScale = scale;\n    localStorage.setItem('weather-scale', scale);\n  }\n\n  updateDate(lang) {\n    const currentDate = new Date();\n    const localeDate = currentDate.toLocaleDateString(lang);\n    this.__currentDateNode.innerText = localeDate;\n    const headerNodes = document.querySelectorAll(`.${_NodeData__WEBPACK_IMPORTED_MODULE_1__[\"INDlistHeader\"]}`);\n    const days = Object(_Translate__WEBPACK_IMPORTED_MODULE_4__[\"getDaysByLanguage\"])(lang);\n    const currentDay = currentDate.getDay();\n    const daysOfprognose = this.__daysOfprognose;\n    const daysHeaders = days.slice(currentDay, currentDay + daysOfprognose);\n    for (let day = 0; day < daysOfprognose; day++) {\n      const curentDay = daysHeaders[day];\n      headerNodes[day].innerText = curentDay;\n    }\n  }\n\n  updateIndicators(weatherData) {\n    const days = this.__daysOfprognose;\n    for (let day = 0; day < days; day++) {\n      const dailyData = weatherData[day];\n      const { main, weather, wind } = dailyData;\n      this.__tempNodes[day].innerText = main.temp;\n      this.__tempStateNodes[day].src = Object(_SideAPI__WEBPACK_IMPORTED_MODULE_2__[\"getImageUrl\"])(weather[0].icon);\n      this.__tempStateNodes[day].alt = weather[0].main;\n      this.__feelsLikeNodes[day].innerText = main.feels_like;\n      this.__windNodes[day].innerText = wind.speed;\n      this.__humidityNodes[day].innerText = main.humidity;\n    }\n  }\n\n  async updateMap() {\n    const { latitude, longitude } = this.__coords;\n    this.__latitudeNode.innerText = latitude;\n    this.__longitudeNode.innerText = longitude;\n    try {\n      Object(_SideAPI__WEBPACK_IMPORTED_MODULE_2__[\"createMap\"])(_SecretKeys__WEBPACK_IMPORTED_MODULE_3__[\"MAP_KEY\"], _NodeData__WEBPACK_IMPORTED_MODULE_1__[\"mapContainerId\"], latitude, longitude);\n    } catch (e) {\n      console.log('Failed to create map!');\n    }\n  }\n\n  async getCityLocation(cityName){\n    try {\n      const query = await Object(_SideAPI__WEBPACK_IMPORTED_MODULE_2__[\"getLocationByCityName\"])(_SecretKeys__WEBPACK_IMPORTED_MODULE_3__[\"GEOCODE_KEY\"], cityName);\n      const coords = query.results[0].geometry;\n      this.__coords = {\n        latitude: coords.lat,\n        longitude: coords.lng,\n      };\n      this.updateMap();\n    } catch (e) {\n      console.log('Failed to get city location!');\n    }\n  }\n\n  async updateWeather(city, initial) {\n    const cityName = city.toLowerCase();\n    await this.changeCity(cityName);\n    const measureScale = this.__measureScale;\n\n    let weatherData = JSON.parse(localStorage.getItem(`weather-city:${cityName}`));\n    this.__dateOfQuery = localStorage.getItem('dateOfQuery');\n    const dateNow = Date.now();\n    const dateOfQuery = localStorage.getItem('dateOfQuery');\n    if ((dateNow - dateOfQuery) > TEN_MINUTES || weatherData === null) {\n      /* If ten minutes passs since previous request\n            i have to made a new one because weather is updated */\n      const language = this.__language;\n      const query = await Object(_SideAPI__WEBPACK_IMPORTED_MODULE_2__[\"GetWeatherData\"])(cityName, language, _SecretKeys__WEBPACK_IMPORTED_MODULE_3__[\"WEATHER_KEY\"]);\n      if (query.cod !== '200') {\n        console.log(query.message);\n        return;\n      }\n      const newData = query.list.filter((reading) => reading.dt_txt.includes('03:00:00'));\n      const newDate = Date.now();\n      localStorage.setItem(`weather-city:${cityName}`, JSON.stringify(newData));\n      localStorage.setItem('dateOfQuery', newDate);\n      weatherData = newData;\n    }\n    this.updateIndicators(weatherData);\n    this.changeMeasureScale(measureScale);\n    if (initial) this.getCurrentPosition();\n    else this.getCityLocation(cityName);\n  }\n\n  async getCurrentPosition() {\n    const posOptions = {\n      enableHighAccuracy: true,\n      timeout: 5000,\n      maximumAge: 0,\n    };\n    const succes = (crd) => {\n      const { coords } = crd;\n      this.__coords.latitude = coords.latitude;\n      this.__coords.longitude = coords.longitude;\n      this.updateMap();\n    };\n    const error = (err) => console.log('error:', err);\n    navigator.geolocation.getCurrentPosition(succes, error, posOptions);\n  }\n\n  async init() {\n    const cityQuery = await Object(_SideAPI__WEBPACK_IMPORTED_MODULE_2__[\"GetLocation\"])(_SecretKeys__WEBPACK_IMPORTED_MODULE_3__[\"LOCATION_KEY\"]);\n    const language = localStorage.getItem('weather-language') || 'ru';\n    const measureScale = localStorage.getItem('weather-scale') || 'c';\n\n    this.__language = language;\n    this.__measureScale = measureScale;\n\n    this.__root.appendChild(_Markdown__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n    this.__background = document.querySelector(`#${_NodeData__WEBPACK_IMPORTED_MODULE_1__[\"backgroundId\"]}`);\n    this.__cityNameNode = document.querySelector(`#${_NodeData__WEBPACK_IMPORTED_MODULE_1__[\"cityNameId\"]}`);\n    this.__currentDateNode = document.querySelector(`#${_NodeData__WEBPACK_IMPORTED_MODULE_1__[\"currentDateId\"]}`);\n\n    const listBlocks = document.querySelectorAll(`.${_NodeData__WEBPACK_IMPORTED_MODULE_1__[\"INDlistBlock\"]}`);\n    this.__listHeaders = document.querySelectorAll(`.${_NodeData__WEBPACK_IMPORTED_MODULE_1__[\"INDlistHeader\"]}`);\n    this.__tempNodes = document.querySelectorAll(`.${_NodeData__WEBPACK_IMPORTED_MODULE_1__[\"currentTemperatureIND\"]}`);\n    this.__tempStateNodes = document.querySelectorAll(`.${_NodeData__WEBPACK_IMPORTED_MODULE_1__[\"tempStateIND\"]}`);\n    this.__feelsLikeNodes = document.querySelectorAll(`.${_NodeData__WEBPACK_IMPORTED_MODULE_1__[\"feelsLikeIND\"]}`);\n    this.__windNodes = document.querySelectorAll(`.${_NodeData__WEBPACK_IMPORTED_MODULE_1__[\"windIND\"]}`);\n    this.__humidityNodes = document.querySelectorAll(`.${_NodeData__WEBPACK_IMPORTED_MODULE_1__[\"humidityIND\"]}`);\n    this.__latitudeNode = document.querySelector(`#${_NodeData__WEBPACK_IMPORTED_MODULE_1__[\"latitudeId\"]}`);\n    this.__longitudeNode = document.querySelector(`#${_NodeData__WEBPACK_IMPORTED_MODULE_1__[\"longitudeId\"]}`);\n\n    const updateButton = document.querySelector(`#${_NodeData__WEBPACK_IMPORTED_MODULE_1__[\"UpdateButtonId\"]}`);\n    const searchInput = document.querySelector(`#${_NodeData__WEBPACK_IMPORTED_MODULE_1__[\"formInputId\"]}`);\n    const searchButton = document.querySelector(`#${_NodeData__WEBPACK_IMPORTED_MODULE_1__[\"formSubmitId\"]}`);\n    const langOptionsNode = document.querySelector(`#${_NodeData__WEBPACK_IMPORTED_MODULE_1__[\"langOptionsId\"]}`);\n    const langOptions = langOptionsNode.options;\n    const measureUnits = document.querySelectorAll(`[name=${_NodeData__WEBPACK_IMPORTED_MODULE_1__[\"measureUnitsName\"]}]`);\n\n    updateButton.onclick = () => {\n      // update image!\n      this.setRandomCityImage();\n    };\n\n    for (const option of langOptions) {\n      if (option.value === language.toUpperCase()) {\n        option.selected = true;\n        break;\n      }\n    }\n\n    for (const unit of measureUnits) {\n      if (unit.value === measureScale.toLowerCase()) {\n        unit.checked = true;\n      }\n      unit.onclick = () => {\n        this.changeMeasureScale(unit.value);\n      };\n    }\n\n    searchButton.onclick = (e) => {\n      e.preventDefault();\n      const cityName = searchInput.value;\n      this.updateWeather(cityName, false);\n    };\n\n    langOptionsNode.onchange = () => {\n      const index = langOptions.selectedIndex;\n      const selectedLanguage = langOptions[index].value.toLowerCase();\n      this.translateTo(selectedLanguage);\n    };\n\n    for (const block of listBlocks) {\n      block.onmouseover = () => {\n        block.classList.add('focused-block');\n      };\n      block.onmouseout = () => {\n        block.classList.remove('focused-block');\n      };\n    }\n\n    const locationCity = cityQuery.city;\n    this.updateWeather(locationCity, true);\n    const currentLang = this.__language;\n    this.translateTo(currentLang);\n  }\n}\n\n//# sourceURL=webpack:///./src/WeatherApp.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _WeatherApp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WeatherApp */ \"./src/WeatherApp.js\");\n/* eslint-disable no-undef */\n\n\nconst BODY = document.querySelector('body');\nconst QUANTITY_OF_DAYS_TO_MAKE_PROGNOSE = 3;\nconst APP = new _WeatherApp__WEBPACK_IMPORTED_MODULE_0__[\"default\"](BODY, QUANTITY_OF_DAYS_TO_MAKE_PROGNOSE);\nAPP.init();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });
});