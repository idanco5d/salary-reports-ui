import {apiClient} from "./client.ts";

const baseUrl = 'http://localhost:3001/auth';

export async function logoutCall() {
    await apiClient.post(baseUrl + '/logout');
}

export async function refreshAccessToken(): Promise<{ accessToken: string }> {
    const response = await fetch(baseUrl + '/refresh', {
        method: 'POST'
    });

    return response.json();
}

