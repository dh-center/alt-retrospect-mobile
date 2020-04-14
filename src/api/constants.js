const API_URL = 'http://learnsql.ru:8000';

export const NO_AUTH_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export const AUTH_HEADERS = NO_AUTH_HEADERS;

export const SIGN_UP_URI = API_URL + '/auth/users';
export const SIGN_IN_URI = API_URL + '/auth/token/login';

export const GET_ALL_ROUTES_URI = API_URL + '/api/routes/get';
export const GET_ROUTE_URI = API_URL + '/api/routes/getById';
export const GET_ALL_TAGS_URI = API_URL + '/api/tags/get';

export const GET_LOCATION_URI = API_URL + '/api/partner/getById';
export const GET_NEAR_LOCATIONS_URI = API_URL + '/api/partner/getLocations';
