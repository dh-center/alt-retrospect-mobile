export const REQUEST_CURRENT_LOCATION = 'REQUEST_CURRENT_LOCATION';

export function requestCurrentLocation() {
    return {
        type: REQUEST_CURRENT_LOCATION,
    };
}

export const RECEIVE_CURRENT_LOCATION = 'RECEIVE_CURRENT_LOCATION';

export function receiveCurrentLocation(latitude, longitude) {
    return {
        type: RECEIVE_CURRENT_LOCATION,
        latitude,
        longitude,
    };
}
