const RU = {
    "feelsLike": "по ощущениям",
    "wind": "ветер",
    "humidity": "влажность",
    "latitude": "широта",
    "logitude": "долгота"
};

const EN = {
    "feelsLike": "feels like",
    "wind": "wind",
    "humidity": "humidity",
    "latitude": "latitude",
    "logitude": "logitude"
}

const daysRu = ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"];
const daysEn = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

function changeLang(translateTo, nodes){
    for (let node of nodes){
        const key = node.getAttribute("data-transl");
        const val = translateTo[key];
        if (val !== undefined){
            node.innerText = `${val}: `;
        }
    }
}

export function Translate(lang, nodes){
    switch(lang){
        case "ru":
            changeLang(RU, nodes);
            break;
        case "en":
            changeLang(EN, nodes);
            break;
    }
}

export function getDaysByLanguage(lang){
    switch(lang){
        case "ru":
            return daysRu;
        case "en":
            return daysEn;
    }
}

export function getPlaceholderText(lang){
    switch(lang){
        case "ru":
            return "Введите название города";
        case "en":
            return "Input city name";
    }
}

export function getSubmitText(lang){
    switch(lang){
        case "ru":
            return "Отправить";
        case "en":
            return "Submit";
    }
}

export function getUpdateButtonText(lang){
    switch(lang){
        case "ru":
            return "Обновить";
        case "en":
            return "Update";
    }
}