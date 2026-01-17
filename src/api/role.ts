import type {RoleCategory} from "./roleCategory.ts";
import {apiClient} from "./client.ts";

export async function createRole(role: Role): Promise<Role> {
    const response = await apiClient.post('/role', role)
    return response.data
}

export async function getRolesByCategoryId(categoryId: string): Promise<Role[]> {
    const response = await apiClient.get(`/role/category/${categoryId}`)
    return response.data
}

export type Role = {
    id?: string,
    name: string,
    roleCategory: RoleCategory
}