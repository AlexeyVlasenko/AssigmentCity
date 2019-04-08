import { likes as ActionTypes } from '../actionTypes';

const initialState = {
    cities: [],
};

export default (state = initialState, action) => {
    const { type, json } = action;
    switch (type) {
        case ActionTypes.LIKE_CITY:
            const { cities } = state;
            cities.push(json);
            return { ...state, cities };
        default:
            return state;
    }
}