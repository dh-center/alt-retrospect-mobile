import {RECEIVE_SEARCH_ROUTES, REQUEST_SEARCH_ROUTES} from '../actions/routes';

export function routesSearch(
    state = {
        isFetching: false,
        didInvalidate: true,
        items: [],
    },
    action,
) {
    switch (action.type) {
        case REQUEST_SEARCH_ROUTES:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_SEARCH_ROUTES:
            return Object.assign({}, state, {
                didInvalidate: false,
                isFetching: false,
                items: action.routes,
            });

        default:
            return state;
    }
}
