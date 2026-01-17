import {apiClient} from "./client.ts";

export async function createRoleCategory(roleCategory: RoleCategory): Promise<RoleCategory> {
    const response = await apiClient.post('/role-category', roleCategory)

    return response.data
}

export async function findAllCategories(): Promise<RoleCategory[]> {
    const response = await apiClient.get('/role-category')

    return response.data
}


export type RoleCategory = {
    id?: string
    name: string
}