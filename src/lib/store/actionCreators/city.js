import { city as ActionTypes } from '../actionCreators';

export const getCity = (id) => {
    const type = ActionTypes.GET_CITY;

    return async dispatch => {
        const data = await api.getCity(id);

        dispatch({ type, data });
    }
};
