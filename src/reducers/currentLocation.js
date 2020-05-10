import {
    RECEIVE_CURRENT_LOCATION,
    REQUEST_CURRENT_LOCATION,
} from '../actions/currentLocation';

export function currentLocation(
    state = {
        isFetching: true,
        data: {},
    },
    action,
) {
    switch (action.type) {
        case RECEIVE_CURRENT_LOCATION:
            return Object.assign({}, state, {
                isFetching: false,
                data: {
                    lat: action.latitude,
                    lon: action.longitude,
                },
            });
        case REQUEST_CURRENT_LOCATION:
            return Object.assign({}, state, {
                isFetching: true,
            });
        default:
            return state;
    }
}
