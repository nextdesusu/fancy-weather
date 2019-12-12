const TIME = "18:00:00";

export async function GetWeatherData(city, lang, accesKey){
    //EXAMPLE: api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=b337884c51dfe2c971db7e082be5b260
    //const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${accesKey}`;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang}&units=metric&APPID=${accesKey}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

export async function GetLocation(accesKey){
    const url = `https://ipinfo.io/json?token=${accesKey}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

export async function GetCityImage(cityName, accesKey){
    const url = `https://api.unsplash.com/photos/random?query=town,${cityName}&client_id=${accesKey}`;
    const urls = await fetch(url);
    const json = await urls.json();
    const blob = await json.urls.small;
    return blob;
}