const RU = {
    "feelsLike": "по ощущениям",
    "wind": "ветер",
    "humidity": "влажность",
    "latitude": "широта",
    "logitude": "долгота"
};

const EN = {
    "feelsLike": "feels Like",
    "wind": "wind",
    "humidity": "humidity",
    "latitude": "latitude",
    "logitude": "logitude"
}

const daysRu = ['воскресенье', 'понедельник', 'вторник', 'среда', 'Ччетверг', 'пятница', 'суббота'];
const daysEn = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

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