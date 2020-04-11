const API_URL = 'http://learnsql.ru:8000';

const TAGS_COUNT = 5;

export const SIGN_UP_ENDPOINT = API_URL + '/auth/users/';
export const SIGN_IN_ENDPOINT = API_URL + '/auth/token/login/';

export const GET_ALL_ROUTES_ENDPOINT = API_URL + '/api/routes/get';
export const GET_ALL_TAGS_ENDPOINT =
    API_URL + '/api/tags/get?count=' + TAGS_COUNT;
