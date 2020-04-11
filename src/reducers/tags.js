import {REQUEST_POPULAR_TAGS, RECEIVE_POPULAR_TAGS} from '../actions/tags';

export function popularTags(
    state = {
        isFetching: false,
        didInvalidate: true,
        items: [],
    },
    action,
) {
    switch (action.type) {
        case REQUEST_POPULAR_TAGS:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_POPULAR_TAGS:
            return Object.assign({}, state, {
                didInvalidate: false,
                isFetching: false,
                items: action.tags,
            });
        default:
            return state;
    }
}
