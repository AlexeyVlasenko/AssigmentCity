import { city as ActionTypes } from '../actionTypes';

export const getCity = (id) => {
    const type = ActionTypes.GET_CITY;

    return async dispatch => {
        const data = await api.getCity(id);

        dispatch({ type, data });
    }
};
