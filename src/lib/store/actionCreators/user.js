import { user as ActionTypes } from '../actionTypes';
import { Geolocation } from 'react-native';

const getLocation = () => {
    return new Promise(Geolocation.getCurrentPosition);
}

export const setLocation = () => {
    const type = ActionTypes.GET_LOCATION;
    return async dispatch => {
        const location = await getLocation();

        console.log(location);
        dispatch(location);
    }
};
