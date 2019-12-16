function toCel(far){
    return (far - 32) * 5 / 9;
}

function toFar(cel){
    return (cel * 9 / 5) + 32;
}

export default function SwapMeasureScale(from, to, value){
    if (from === to) return value;
    let res = 0;
    switch(to){
        case "f":
            res = toFar(value);
            break;
        case "c":
            res = toCel(value);
            break;
        default:
            throw Error(`Unknown scale: ${to}`);
    }
    return res.toFixed(2);
}