import {REQUEST_ALL_ROUTES, RECEIVE_ALL_ROUTES} from '../actions/routes';

export function routes(
    state = {
        isFetching: false,
        didInvalidate: true,
        items: [],
    },
    action,
) {
    switch (action.type) {
        case REQUEST_ALL_ROUTES:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_ALL_ROUTES:
            return Object.assign({}, state, {
                didInvalidate: false,
                isFetching: false,
                items: action.routes,
            });
        default:
            return state;
    }
}
