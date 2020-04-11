const NO_AUTH_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

const AUTH_HEADERS = NO_AUTH_HEADERS;

export function fetchPOST(url, body, needAuth: false) {
    return fetch(url, {
        method: 'POST',
        headers: needAuth ? AUTH_HEADERS : NO_AUTH_HEADERS,
        body: JSON.stringify(body),
    })
        .then(response => response.json())
        .then(json => {
            return json;
        })
        .catch(error => {
            console.log(error);
        });
}

export function fetchGET(url, needAuth: false) {
    return fetch(url, {
        method: 'GET',
        headers: needAuth ? AUTH_HEADERS : NO_AUTH_HEADERS,
    })
        .then(response => response.json())
        .then(json => {
            return json;
        })
        .catch(error => {
            console.log(error);
        });
}
