/* eslint-disable no-restricted-syntax */
const RU = {
  feelsLike: 'по ощущениям',
  wind: 'ветер',
  humidity: 'влажность',
  latitude: 'широта',
  logitude: 'долгота',
};

const EN = {
  feelsLike: 'feels like',
  wind: 'wind',
  humidity: 'humidity',
  latitude: 'latitude',
  logitude: 'logitude',
};

const BE = {
  feelsLike: 'адчувае, як',
  wind: 'вецер',
  humidity: 'вільготнасць',
  latitude: 'шыраты',
  logitude: 'шыльдату',
};

const daysRu = ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'];
const daysEn = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const daysBe = ['няд', 'пнд', 'аўт', 'сер', 'чцв', 'пят', 'суб'];

function changeLang(translateTo, nodes) {
  for (const node of nodes) {
    const key = node.getAttribute('data-transl');
    const val = translateTo[key];
    if (val !== undefined) {
      node.innerText = `${val}: `;
    }
  }
}

export function Translate(lang, nodes) {
  switch (lang) {
    case 'ru':
      changeLang(RU, nodes);
      break;
    case 'en':
      changeLang(EN, nodes);
      break;
    case 'be':
      changeLang(BE, nodes);
      break;
    default:
      throw Error(`Unknown lang: ${lang}`);
  }
}

export function getDaysByLanguage(lang) {
  switch (lang) {
    case 'ru':
      return daysRu;
    case 'en':
      return daysEn;
    case 'be':
      return daysBe;
    default:
      throw Error(`Unknown lang: ${lang}`);
  }
}

export function getPlaceholderText(lang) {
  switch (lang) {
    case 'ru':
      return 'Введите название города';
    case 'en':
      return 'Input city name';
    case 'be':
      return 'Увядзіце назву горада';
    default:
      throw Error(`Unknown lang: ${lang}`);
  }
}

export function getSubmitText(lang) {
  switch (lang) {
    case 'ru':
      return 'Отправить';
    case 'en':
      return 'Submit';
    case 'be':
      return 'Адправіць';
    default:
      throw Error(`Unknown lang: ${lang}`);
  }
}

export function getUpdateButtonText(lang) {
  switch (lang) {
    case 'ru':
      return 'Обновить';
    case 'en':
      return 'Update';
    case 'be':
      return 'Абнаўленне';
    default:
      throw Error(`Unknown lang: ${lang}`);
  }
}
