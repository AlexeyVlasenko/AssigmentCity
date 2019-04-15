import * as api from '../../services/cities/citiesService';
import { cities as ActionTypes } from '../actionTypes';
import { sortCitiesByLikes, indexOfLike } from '../../utils/store/cities';
import { validateJSON } from '../../utils/store/validation';

export const getCities = () => {
  const type = ActionTypes.GET_CITIES;

  return async (dispatch, getState) => {
    const json = await api.getCities();
    const error = validateJSON(json);

    if (error) {
      return dispatch({ type, error });
    }

    const { likes } = getState().cities;
    const cities = json.sort(sortCitiesByLikes(likes));

    return dispatch({ type, data: cities });
  };
};

export const searchCities = (query) => {
  const type = ActionTypes.SEARCH_CITIES;

  return async (dispatch) => {
    const json = await api.searchCities(query);
    const error = validateJSON(json);

    if (error) {
      return dispatch({ type, error });
    }

    return dispatch({ type, data: json });
  };
};

export const likeCity = (id) => {
  const type = ActionTypes.LIKE_CITY;

  return async (dispatch, getState) => {
    const { likes } = getState().cities;
    const removeAt = indexOfLike(likes, id);

    if (removeAt !== -1) {
      likes.splice(removeAt, 1);
    } else {
      likes.push({ cityId: id, date: Date.now() });
    }

    dispatch({ type, data: likes });
  };
};
