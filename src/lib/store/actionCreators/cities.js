import * as api from '../../../res/apiMock/api';
import { cities as ActionTypes } from '../actionTypes';

export const getCities = () => {
    const type = ActionTypes.GET_CITIES;

    return async dispatch => {
        const data = await api.getCities();

        dispatch({ type, data });
    };
};

export const searchCities = (query) => {
    const type = ActionTypes.SEARCH_CITIES;

    return async dispatch => {
        const data = await api.searchCities(query);

        dispatch({ type, data });
    };
};

export const likeCity = (id) => {
    const type = ActionTypes.LIKE_CITY;
    return {
        type,
        data: {
            id,
            likedAt: Date.now(),
        },
    };
};
