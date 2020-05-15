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
