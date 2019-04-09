import { city as ActionTypes } from '../actionCreators';

const initialState = {
    city: null,
    cityLoading: true,
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case ActionTypes.GET_CITY:
            return {
                ...state,
                city: data,
                cityLoading: false,
            };
        case ActionTypes.RESET_CITY:
            return initialState;
        default:
            return state;
    }
};
