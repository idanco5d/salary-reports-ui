import {apiClient} from "./apiClient.ts";
import type {User} from "../model/user.ts";

const baseUrl = 'http://localhost:3001/user';

export async function findAllUsers(): Promise<User[]> {
    const response = await apiClient.get(baseUrl + '/find-all');
    return response.data;
}

export async function makeUserAdmin(userId: string): Promise<User> {
    const response = await apiClient.put(`${baseUrl}/make-admin/${userId}`);
    return response.data;
}

