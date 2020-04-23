import {REQUEST_SAVED_ROUTES, RECEIVE_SAVED_ROUTES} from '../actions/profile';

export function savedRoutes(
    state = {
        isFetching: false,
        didInvalidate: true,
        items: [],
    },
    action,
) {
    switch (action.type) {
        case REQUEST_SAVED_ROUTES:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_SAVED_ROUTES:
            return Object.assign({}, state, {
                didInvalidate: false,
                isFetching: false,
                items: action.routes.map(item => {
                    return {
                        ...item,
                        isFetching: false,
                    };
                }),
            });

        default:
            return state;
    }
}
