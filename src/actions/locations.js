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
