import cities from './cities.json';
import places from './places.json';

const mapCity = (city) => {
    const sightSeeings = places.filter(place => city.id === place.cityId);

    return { ...city, sightSeeings };
};

const getCities = () => new Promise(res => {
    setTimeout(() => res(cities), 500);
});

const getCity = (id) => new Promise((resolve, reject) => {
    const city = cities.find(c => c.id === id);

    if (!city) {
        reject(false);
    }

    const mapped = mapCity(city);
    setTimeout(() => resolve(mapped), 500);
});

const searchByNameFor = (query) => ({ name }) => name.match(query);

const getCityByPlace = (place) => {
    return cities.find(city => city.id === place.cityId);
};

const onlyUnique = (item, index, arr) => {
    return arr.indexOf(item) === index;
}

const searchCities = (query) => {
    const searchByName = searchByNameFor(query);
    const citiesResult = cities.filter(searchByName);
    const placesResult = places.filter(searchByName);
    const citiesByPlaces = placesResult.map(getCityByPlace);

    const searchResult = citiesResult
        .concat(citiesByPlaces)
        .filter(onlyUnique);

    return Promise.resolve(searchResult);
};

export {
    getCities,
    getCity,
    searchCities,
};
