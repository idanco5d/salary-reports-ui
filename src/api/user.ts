import {apiClient} from "./client.ts";

const baseUrl = 'http://localhost:3001/user';

export async function findAllUsers(): Promise<User[]> {
    const response = await apiClient.get(baseUrl + '/find-all');
    return response.data;
}

export async function makeUserAdmin(userId: string): Promise<User> {
    const response = await apiClient.put(`${baseUrl}/make-admin/${userId}`);
    return response.data;
}

export type User = {
    id: string;
    role: UserRoleType;
};
export const UserRole = {
    ADMIN: 'ADMIN',
    USER: 'USER',
} as const;
export type UserRoleType = typeof UserRole[keyof typeof UserRole] | null;