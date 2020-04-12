import {
    REQUEST_ALL_ROUTES,
    RECEIVE_ALL_ROUTES,
    REQUEST_ROUTE,
    RECEIVE_ROUTE,
    RESET_ROUTE,
    SET_ROUTE,
} from '../actions/routes';

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

export function currentRoute(
    state = {
        isFetching: false,
        didInvalidate: true,
        data: {},
    },
    action,
) {
    switch (action.type) {
        case SET_ROUTE:
            return {
                ...state,
                isFetching: true,
                data: {
                    id: action.route,
                },
            };
        case RESET_ROUTE:
            return {
                ...state,
                isFetching: false,
                didInvalidate: true,
            };
        case REQUEST_ROUTE:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_ROUTE:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                data: action.route,
            };
        default:
            return state;
    }
}
