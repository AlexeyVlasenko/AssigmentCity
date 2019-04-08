import cities from './cities.json';
import places from './places.json';

const mapCity = (city) => {
    const sightSeeings = places.filter(place => city.id === place.cityId); 

    return { ...city, sightSeeings };
};

const getCities = () => {
    const mapped = cities.map(mapCity);
    
    return Promise.resolve(mapped);
};

const searchByNameFor = (query) => ({ name }) => name.test(query);

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

const likeCity = (id) => {
    const city = cities.find(city => city.id === id);

    if (!city) {
        return Promise.resolve(false);
    }

    const mapped = mapCity(city);
    const { like } = mapped;
    like.liked = true;
    like.at = Date.now();

    return Promise.resolve(mapped);
}

export {
    getCities,
    searchCities,
    likeCity,
};
