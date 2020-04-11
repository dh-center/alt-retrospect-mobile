import {RECEIVE_AUTH_TOKEN, REQUEST_AUTH_TOKEN} from '../actions/auth';

export function auth(
    state = {
        isFetching: false,
        didInvalidate: false,
        authToken: null,
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
        default:
            return state;
    }
}
