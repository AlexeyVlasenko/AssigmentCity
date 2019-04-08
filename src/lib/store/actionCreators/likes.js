import { likes as ActionTypes } from '../actionTypes';

export const likeCity = (id) => {
    const type = ActionTypes.LIKE_CITY;

    return async dispatch => {
        const json = await api.likeCity(id);

        dispatch({ type, json })
    }
}