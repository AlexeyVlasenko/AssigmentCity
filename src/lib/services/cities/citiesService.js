import cities from './res/cities.json';
import places from './res/places.json';

import City from './models/City';

const mapCity = (city) => {
  const sightSeeings = places.filter(place => city.id === place.cityId);

  return { ...city, sightSeeings };
};

const getCities = () => new Promise((res) => {
  const cityObjects = cities
    .map(data => new City(data))
    .filter(cityObj => cityObj.validate());

  setTimeout(() => res(cityObjects), 500);
});

const getCity = id => new Promise((resolve) => {
  const city = cities
    .find(c => c.id === id);


  const mapped = mapCity(city);
  setTimeout(() => resolve(mapped), 500);
});

const searchByNameFor = query => ({ name }) => name.match(query);

const getCityByPlace = place => cities.find(city => city.id === place.cityId);

const onlyUnique = (item, index, arr) => arr.indexOf(item) === index;

const searchCities = (query) => {
  const searchByName = searchByNameFor(query);
  const citiesResult = cities.filter(searchByName);
  const placesResult = places.filter(searchByName);
  const citiesByPlaces = placesResult.map(getCityByPlace);

  const searchResult = citiesResult
    .concat(citiesByPlaces)
    .filter(onlyUnique)
    .map(data => new City(data))
    .filter(cityObj => cityObj.validate());

  return Promise.resolve(searchResult);
};

export {
  getCities,
  getCity,
  searchCities,
};
