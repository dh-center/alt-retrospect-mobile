import {getTags} from '../api/tags';

export const REQUEST_POPULAR_TAGS = 'REQUEST_ALL_TAGS';

function requestPopularTags() {
    return {
        type: REQUEST_POPULAR_TAGS,
    };
}

export const RECEIVE_POPULAR_TAGS = 'RECEIVE_ALL_TAGS';

function receivePopularTags(tags) {
    return {
        type: RECEIVE_POPULAR_TAGS,
        tags,
    };
}

export function fetchPopularTags() {
    return function(dispatch) {
        dispatch(requestPopularTags());

        return getTags().then(json => {
            dispatch(receivePopularTags(json.tags));
        });
    };
}

export const CREATE_TAG = 'CREATE_TAG';

export function createTag(tag) {
    return {
        type: CREATE_TAG,
        payload: tag,
    };
}

export const UPDATE_TAG = 'UPDATE_TAG';

export function updateTag(tag) {
    return {
        type: UPDATE_TAG,
        payload: tag,
    };
}
