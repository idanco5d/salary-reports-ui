import type {RoleCategory} from "./roleCategory.ts";
import {apiClient} from "./client.ts";

const baseUrl = '/role';

export async function createRole(role: Role): Promise<Role> {
    const response = await apiClient.post(baseUrl, role)
    return response.data
}

export async function getRolesByCategoryId(categoryId: string): Promise<Role[]> {
    const response = await apiClient.get(baseUrl + `/category/${categoryId}`)
    return response.data
}

export type Role = {
    id?: string,
    name: string,
    roleCategory: RoleCategory
}