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

function changeLang(translateTo, nodes){
    for (let node of nodes){
        const key = node.getAttribute("data-transl");
        const val = translateTo[key];
        if (val !== undefined){
            node.innerText = `${val}: `;
        }
    }
}

export default function Translate(lang, nodes){
    switch(lang){
        case "ru":
            changeLang(RU, nodes);
            break;
        case "en":
            changeLang(EN, nodes);
            break;
    }
}