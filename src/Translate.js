const RU = [
    "по ощущениям:",
    "ветер:",
    "влажность:",
    "широта:",
    "долгота:"
];

function changeLang(translateTo, nodes){
    for (let word = 0; word < translateTo.length; word++){
        const node = nodes[word];
        node.innerText = translateTo[word];
    }
}

export default function Translate(lang, nodes){
    switch(lang){
        case "ru":
            changeLang(RU, nodes);
            break;
    }
}