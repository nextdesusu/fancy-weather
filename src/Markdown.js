/* eslint-disable no-undef */
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

const md = `
    <div class="app-header">
        <div class="settings">
            <button data-transl="update" class="settings__elem" id="${UpdateButtonId}">Update</button>
            <select id="${langOptionsId}" class="settings__elem lang-list">
                <option value="EN">EN</option>
                <option value="RU">RU</option>
                <option value="BE">BE</option>
            </select>
            <div class="settings__elem checkbox-wrapper">
                <label class="checkbox-container">
                    <span>c</span>
                    <input value="c" class="checkbox-elem" type="radio" name="${measureUnitsName}">
                    <span class="checkbox-checkmark"></span>
                </label>
                <label class="checkbox-container">
                    <span>f</span>
                    <input value="f" class="checkbox-elem" type="radio" name="${measureUnitsName}">
                    <span class="checkbox-checkmark"></span>
                </label>
            </div>
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
                <div class="${INDlistBlock}">
                    <h2 class="${INDlistHeader}"></h2>
                    <h3 data-temp="c" class="${currentTemperatureIND}"></h3>
                    <img class="${tempStateIND}" src="">
                    <ul class="inidicators-list">
                        <li class="inidicators-item">
                            <span data-transl="feelsLike"></span>
                            <span data-feelsLike="c" class="${feelsLikeIND}"></span>
                        </li>
                        <li class="inidicators-item">
                            <span data-transl="wind"></span>
                            <span class="${windIND}"></span>
                        </li>
                        <li class="inidicators-item">
                            <span data-transl="humidity">
                            </span><span class="${humidityIND}"></span>
                        </li>
                    </ul>
                </div>
                <div class="${INDlistBlock}">
                    <h2 class="${INDlistHeader}"></h2>
                    <h3 data-temp="c" class="${currentTemperatureIND}"></h3>
                    <img class="${tempStateIND}" src="">
                    <ul class="inidicators-list">
                        <li class="inidicators-item">
                            <span data-transl="feelsLike"></span>
                            <span data-feelsLike="c" class="${feelsLikeIND}"></span>
                        </li>
                        <li class="inidicators-item">
                            <span data-transl="wind"></span>
                            <span class="${windIND}"></span>
                        </li>
                        <li class="inidicators-item">
                            <span data-transl="humidity"></span>
                            <span class="${humidityIND}"></span>
                        </li>
                    </ul>
                </div>
                <div class="${INDlistBlock}">
                    <h2 class="${INDlistHeader}"></h2>
                    <h3 data-temp="c" class="${currentTemperatureIND}"></h3>
                    <img class="${tempStateIND}" src="">
                    <ul class="inidicators-list">
                        <li class="inidicators-item">
                            <span data-transl="feelsLike"></span>
                            <span data-feelsLike="c" class="${feelsLikeIND}"></span>
                        </li>
                        <li class="inidicators-item">
                            <span data-transl="wind"></span>
                            <span class="${windIND}"></span>
                        </li>
                        <li class="inidicators-item">
                            <span data-transl="humidity"></span>
                            <span class="${humidityIND}"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="map-container">
            <div id="${mapContainerId}" class="map"></div>
            <div class="map-coordinates">
                <ul class="coordinates-list">
                    <li class="coordinates-item">
                        <span data-transl="latitude"></span>
                        <span id="${latitudeId}"></span>
                    </li>
                    <li class="coordinates-item">
                        <span data-transl="logitude"></span>
                        <span id="${longitudeId}"></span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
`;

const Markdown = document.createElement('div');
Markdown.innerHTML = md;
Markdown.id = backgroundId;

export default Markdown;
