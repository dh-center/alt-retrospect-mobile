import {
    RECEIVE_NEAR_LOCATIONS,
    RECEIVE_SEARCH_LOCATIONS,
    REQUEST_NEAR_LOCATIONS,
    REQUEST_SEARCH_LOCATIONS,
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

export function locationsSearch(
    state = {
        isFetching: false,
        didInvalidate: true,
        items: [],
    },
    action,
) {
    switch (action.type) {
        case REQUEST_SEARCH_LOCATIONS:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_SEARCH_LOCATIONS:
            return Object.assign({}, state, {
                didInvalidate: false,
                isFetching: false,
                items: action.locations,
            });
        default:
            return state;
    }
}
