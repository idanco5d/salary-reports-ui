const baseUrl = 'localhost:3001/auth';

export async function loginCall() {
    const response = await fetch(baseUrl + '/login', {method: 'GET'});

    return response.json();
}

export async function logoutCall() {
    await fetch(baseUrl + '/logout', {method: 'POST'});
}

export async function refreshAccessToken() {
    const response = await fetch(baseUrl + '/refresh', {
        method: 'POST'
    });

    return response.json();
}