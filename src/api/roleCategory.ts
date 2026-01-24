import {apiClient} from "./apiClient.ts";
import type {RoleCategory} from "../model/roleCategory.ts";

export async function createRoleCategory(roleCategory: RoleCategory): Promise<RoleCategory> {
    const response = await apiClient.post('/role-category', roleCategory)

    return response.data
}

export async function findAllCategories(): Promise<RoleCategory[]> {
    const response = await apiClient.get('/role-category')

    return response.data
}
