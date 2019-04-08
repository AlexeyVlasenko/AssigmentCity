import { cities as ActionTypes } from '../actionTypes';

const initialState = {
    list: [],
    search: [],
};

export default (state = initialState, action) => {
    const { type, json } = action;
    switch (type) {
        case ActionTypes.GET_CITIES:
            return { ...state, list: json };
        case ActionTypes.SEARCH_CITIES:
            return { ...state, search: json };
        default:
            return state;
    }
};
