import {
    REQUEST_SAVED_ROUTES,
    RECEIVE_SAVED_ROUTES,
    REQUEST_USER_INFO,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RESET_SAVED_ROUTES,
} from '../actions/profile';

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
        case RESET_SAVED_ROUTES:
            Object.assign({}, state, {
                didInvalidate: true,
                isFetching: false,
                items: [],
            });
        default:
            return state;
    }
}

export function userInfo(
    state = {
        isFetching: false,
        didInvalidate: true,
        username: undefined,
    },
    action,
) {
    switch (action.type) {
        case REQUEST_USER_INFO:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_USER_INFO:
            return Object.assign({}, state, {
                didInvalidate: false,
                isFetching: false,
                username: action.username,
            });
        case RESET_USER_INFO:
            return Object.assign({}, state, {
                didInvalidate: false,
                isFetching: false,
                username: undefined,
            });
        default:
            return state;
    }
}
