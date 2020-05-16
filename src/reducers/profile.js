import {
    RECEIVE_USER_INFO,
    REQUEST_USER_INFO,
    RESET_USER_INFO,
} from '../actions/profile';

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
