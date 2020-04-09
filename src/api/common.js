export function fetchPOST(url, body) {
    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
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
