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

const md = `
    <div class="app-header">
        <div class="settings">
            <button class="settings__elem" id="${UpdateButtonId}">Update</button>
            <select id="${langOptionsId}" class="settings__elem lang-list">
                <option value="EN">EN</option>
                <option value="RU">RU</option>
            </select>
            <label class="checkbox-container settings__elem">cel
                <input value="CEL" class="checkbox-elem" type="radio" name="${measureUnitsName}">
                <span class="checkbox-checkmark"></span>
            </label>
            <label class="checkbox-container settings__elem">far
                <input value="FAR" class="checkbox-elem" type="radio" name="${measureUnitsName}">
                <span class="checkbox-checkmark"></span>
            </label>
        </div>
        <form class="settings__elem form" id="${formId}" action="/" method="GET">
            <input required type="text" id="${formInputId}" class="form__input" placeholder="Search city or ZIP">
            <input id="${formSubmitId}" class="form__submit" type="submit">
        </form>
    </div>
    <div class="app-main">
        <div class="info">
            <h1 id="${cityNameId}" class="info-header"></h1>
            <h3 id="${currentDateId}" class="info-date"></h3>
            <div class="inidicators-wrapper">
                <ul class="inidicators-list">
                    <li data-transl="1" class="inidicators-item"><span class="${tempStateIND}"></span></li>
                    <li data-transl="1" class="inidicators-item">feels like: <span class="${feelsLikeIND}"></span></li>
                    <li data-transl="1" class="inidicators-item">wind: <span class="${windIND}"></span></li>
                    <li data-transl="1" class="inidicators-item">humidity: <span class="${humidityIND}"></span></li>
                </ul>
                <ul class="inidicators-list">
                    <li data-transl="1" class="inidicators-item"><span class="${tempStateIND}"></span></li>
                    <li data-transl="1" class="inidicators-item">feels like: <span class="${feelsLikeIND}"></span></li>
                    <li data-transl="1" class="inidicators-item">wind: <span class="${windIND}"></span></li>
                    <li data-transl="1" class="inidicators-item">humidity: <span class="${humidityIND}"></span></li>
                </ul>
                <ul class="inidicators-list">
                    <li data-transl="1" class="inidicators-item"><span class="${tempStateIND}"></span></li>
                    <li data-transl="1" class="inidicators-item">feels like: <span class="${feelsLikeIND}"></span></li>
                    <li data-transl="1" class="inidicators-item">wind: <span class="${windIND}"></span></li>
                    <li data-transl="1" class="inidicators-item">humidity: <span class="${humidityIND}"></span></li>
                </ul>
            </div>
        </div>
        <div class="map-container">
            <div id="map" class="map"></div>
            <div class="map-coordinates">
                <ul class="coordinates-list">
                    <li data-transl="1" class="coordinates-item">latitude: <span id="${latitudeId}"></span></li>
                    <li data-transl="1" class="coordinates-item">logitude: <span id="${longitudeId}"></span></li>
                </ul>
            </div>
        </div>
    </div>
`

const Markdown = document.createElement("div");
Markdown.innerHTML = md;
Markdown.id = backgroundId;

export default Markdown;