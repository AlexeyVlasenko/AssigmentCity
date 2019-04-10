import { cities as ActionTypes } from '../actionTypes';

const initialState = {
    cities: [],
    likes: [],
    searchResult: [],
    citiesLoading: true,
    searchLoading: true,
};

const indexOfLike = (likes, like) => {
    for (let index = 0; index < likes.length; index++) {
        if (likes[index].id === like.id) {
            return index;
        }
    }

    return -1;
};

const sortCitiesByLikes = (likes) => (first, second) => {
    const firstLike = likes.find(like => like.id === first.id);
    const secondLike = likes.find(like => like.id === second.id);

    if (!firstLike && !secondLike) {
        const firstName = String(first.name).toLowerCase();
        const secondName =  second.name.toLowerCase();

        return firstName.localeCompare(secondName);
    } else if (firstLike && secondLike) {
        return secondLike.likedAt - firstLike.likedAt;
    } else {
        return firstLike ? -1 : 1;
    }
};

const processLike = (state, like) => {
    const likes = [...state.likes];
    const removeAt = indexOfLike(likes, like);

    if (~removeAt) {
        likes.splice(removeAt, 1);
    } else {
        likes.push(like);
    }

    return { ...state, likes };
};

const processCities = (state, data) => {
    const cities = data.sort(sortCitiesByLikes(state.likes));

    return { ...state, cities, citiesLoading: false };
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case ActionTypes.GET_CITIES:
            return processCities(state, data);
        case ActionTypes.SEARCH_CITIES:
            return {
                ...state,
                searchResult: data,
                searchLoading: false,
            };
        case ActionTypes.LIKE_CITY:
            return processLike(state, data);
        default:
            return state;
    }
};
