import { city as ActionTypes } from '../actionTypes';
import * as api from "../../../res/apiMock/api";

export const getCity = (id) => {
    const type = ActionTypes.GET_CITY;

    return async dispatch => {
        const data = await api.getCity(id);

        dispatch({ type, data });
    };
};

export const resetCity = () => {
    const type = ActionTypes.RESET_CITY;

    return dispatch => {
        dispatch({ type })
    };
};
