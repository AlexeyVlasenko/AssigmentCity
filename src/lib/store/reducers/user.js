import { user as ActionTypes } from '../actionTypes';

const initialState = {
    location: [],
    locationLoading: true,
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case ActionTypes.SET_LOCATION:
            return {
                ...state,
                location: data,
                locationLoading: false
            };
        default:
            return state;
    }
}