const URL = 'http://api.openweathermap.org/data/2.5/weather';
const KEY = '5bcd86e936ba5c6a52774c90191a8d8a';

export const getWeather = async (coords) => {
    const [lat, lon] = coords;
    return fetch(`${URL}?lat=${lat}&lon=${lon}&APPID=${KEY}`).then(res => res.json());
}