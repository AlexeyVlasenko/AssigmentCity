import { cities as ActionTypes } from '../actionTypes';

const initialState = {
    cities: [],
    search: [],
    likes: [],
};

const processLike = (state, data) => {
    return { ...state, likes: [...likes, data] };
}

const processCities = (state, data) => {
    const cities = data.sort((first, second) => {
        const firstLike = state.likes.find(like => like.id === first.id);
        const secondLike = state.likes.find(like => like.id === second.id);

        if (!firstLike && !secondLike) {
            return first.name.toUpperCase() - second.name.toUpperCase();
        } else if (firstLike && secondLike) {
            return secondLike.likedAt - firstLike.likedAt;
        } else if (firstLike) {
            return 1;
        } else {
            return -1;
        }
    });

    return { ...state, cities };
}

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case ActionTypes.GET_CITIES:
            return processCities(state, data);
        case ActionTypes.SEARCH_CITIES:
            return { ...state, search: data };
        case ActionTypes.LIKE_CITY:
            return processLike(state, data);
        default:
            return state;
    }
};
