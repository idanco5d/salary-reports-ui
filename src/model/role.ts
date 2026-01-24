import type {RoleCategory} from "./roleCategory.ts";

export type Role = {
    id?: string,
    name: string,
    roleCategory: RoleCategory
}