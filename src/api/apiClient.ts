import axios, {type InternalAxiosRequestConfig} from 'axios';
import {refreshAccessToken} from "./auth.ts";

export const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

let authToken: string | null = null;
let isRefreshing = false;

export const setAuthToken = (token: string | null) => {
    authToken = token;
};

export const getAuthToken = () => authToken;

export const clearAuthToken = () => {
    authToken = null;
};

apiClient.interceptors.request.use((config) => {
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
});

let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}> = [];

// If a request fails with 401, try to refresh the token once
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        if (originalRequest.url?.endsWith('/auth/refresh')) {
            clearAuthToken();
            window.dispatchEvent(new Event('unauthorized'));
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return queueRequest(originalRequest);
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            return await handleRefreshToken(originalRequest);
        } catch (refreshError) {
            return handleFailedRefresh(refreshError);
        } finally {
            setTimeout(() => {
                isRefreshing = false;
            }, 2000);
        }
    }
);

async function queueRequest(originalRequest: InternalAxiosRequestConfig) {
    try {
        const token = await new Promise((resolve, reject) => {
            failedQueue.push({resolve, reject});
        });
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return await apiClient(originalRequest);
    } catch (err) {
        return await Promise.reject(err);
    }
}

async function handleRefreshToken(originalRequest: InternalAxiosRequestConfig) {
    const {accessToken} = await refreshAccessToken();
    setAuthToken(accessToken);

    processQueue(null, accessToken);

    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    return apiClient(originalRequest);
}

function handleFailedRefresh(refreshError: unknown) {
    processQueue(refreshError, null);
    clearAuthToken();
    window.dispatchEvent(new Event('unauthorized'));
    return Promise.reject(refreshError);
}

function processQueue(error: unknown, token: string | null = null) {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token!);
        }
    });
    failedQueue = [];
}