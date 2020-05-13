import {getLocation} from '../api/locations';

export const REQUEST_LOCATION = 'REQUEST_LOCATION';

function requestLocation(id) {
    return {
        type: REQUEST_LOCATION,
    };
}

export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';

function receiveLocation(location) {
    return {
        type: RECEIVE_LOCATION,
        location,
    };
}

export function fetchLocation(id) {
    return function(dispatch) {
        dispatch(requestLocation(id));

        return getLocation(id).then(json => {
            dispatch(createLocation(json.partner));
            // dispatch(receiveLocation(json.partner));
        });
    };
}

export const CREATE_LOCATION = 'CREATE_LOCATION';

export function createLocation(location) {
    return {
        type: CREATE_LOCATION,
        payload: location,
    };
}

export const UPDATE_LOCATION = 'UPDATE_LOCATION';

export function updateLocation(location) {
    return {
        type: UPDATE_LOCATION,
        payload: location,
    };
}
