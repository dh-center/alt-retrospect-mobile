import {
    RECEIVE_AUTH_TOKEN,
    REQUEST_AUTH_TOKEN,
    RESET_AUTH_TOKEN,
} from '../actions/auth';

export function auth(
    state = {
        isFetching: false,
        didInvalidate: false,
        authToken: undefined,
    },
    action,
) {
    switch (action.type) {
        case REQUEST_AUTH_TOKEN:
            return Object.assign({}, state, {
                didInvalidate: true,
                isFetching: true,
            });
        case RECEIVE_AUTH_TOKEN:
            return Object.assign({}, state, {
                didInvalidate: false,
                isFetching: false,
                authToken: action.authToken,
            });
        case RESET_AUTH_TOKEN:
            return Object.assign({}, state, {
                didInvalidate: false,
                isFetching: false,
                authToken: undefined,
            });
        default:
            return state;
    }
}
