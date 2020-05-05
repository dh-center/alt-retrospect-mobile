import {getLocation, getNearLocations} from '../api/locations';

export const REQUEST_NEAR_LOCATIONS = 'REQUEST_NEAR_LOCATIONS';

function requestNearLocations() {
    return {
        type: REQUEST_NEAR_LOCATIONS,
    };
}

export const RECEIVE_NEAR_LOCATIONS = 'RECEIVE_NEAR_LOCATIONS';

function receiveNearLocations(locations) {
    return {
        type: RECEIVE_NEAR_LOCATIONS,
        locations,
    };
}

export function fetchNearLocations(lat, lon, radius) {
    return function(dispatch) {
        dispatch(requestNearLocations());

        return getNearLocations(lat, lon, radius).then(json => {
            dispatch(receiveNearLocations(json.locations));
        });
    };
}

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

function createLocation(location) {
    return {
        type: CREATE_LOCATION,
        payload: location,
    };
}

export const UPDATE_LOCATION = 'UPDATE_LOCATION';

function updateLocation(location) {
    return {
        type: UPDATE_LOCATION,
        payload: location,
    };
}
