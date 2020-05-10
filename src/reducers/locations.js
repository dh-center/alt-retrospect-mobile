import {
    RECEIVE_NEAR_LOCATIONS,
    REQUEST_NEAR_LOCATIONS,
} from '../actions/locations';

export function nearLocations(
    state = {
        isFetching: false,
        didInvalidate: true,
        items: [],
    },
    action,
) {
    switch (action.type) {
        case REQUEST_NEAR_LOCATIONS:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_NEAR_LOCATIONS:
            return Object.assign({}, state, {
                didInvalidate: false,
                isFetching: false,
                items: action.locations,
            });
        default:
            return state;
    }
}
