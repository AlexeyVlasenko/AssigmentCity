import { cities as ActionTypes } from '../actionTypes';

const initialState = {
  cities: [],
  likes: [],
  searchResult: [],
  error: null,
  citiesLoading: true,
  searchLoading: true,
};

export default (state = initialState, action) => {
  const { type, data, error } = action;
  switch (type) {
    case ActionTypes.GET_CITIES:
      return {
        ...state,
        error,
        cities: data,
        citiesLoading: false,
      };
    case ActionTypes.SEARCH_CITIES:
      return {
        ...state,
        error,
        searchResult: data,
        searchLoading: false,
      };
    case ActionTypes.LIKE_CITY:
      return {
        ...state,
        error,
        likes: data,
      };
    default:
      return state;
  }
};
