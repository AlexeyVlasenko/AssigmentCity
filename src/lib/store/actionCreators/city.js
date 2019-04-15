import { city as ActionTypes } from '../actionTypes';
import * as api from '../../services/cities/citiesService';

import { validateJSON } from '../../utils/store/validation';

export const getCity = (id) => {
  const type = ActionTypes.GET_CITY;

  return async (dispatch) => {
    const json = await api.getCity(id);
    const error = validateJSON(json);

    if (error) {
      return dispatch({ type, error });
    }

    return dispatch({ type, data: json });
  };
};

export const resetCity = () => {
  const type = ActionTypes.RESET_CITY;

  return (dispatch) => {
    dispatch({ type });
  };
};
