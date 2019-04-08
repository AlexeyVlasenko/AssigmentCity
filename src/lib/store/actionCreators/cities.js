import * as api from '../../../res/apiMock/api';
import { cities as ActionTypes } from '../actionTypes';

export const getCities = () => {
    const type = ActionTypes.GET_CITIES;

    return async dispatch => {
        const cities = await api.getCities();

        // @TODO: get weather

        dispatch({ type, json });
    }
}

export const searchCities = (query) => {
    const type = ActionTypes.SEARCH_CITIES;

    return async dispatch => {
        const json = await api.searchCities(query);

        dispatch({ type, json });
    }
}

export const likeCity = (id) => {
    const type = ActionTypes.LIKE_CITY;

    return async dispatch => {
        const json = await api.likeCity(id);

        dispatch({ type, json })
    }
}