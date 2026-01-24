import {Container, Paper, Typography} from "@mui/material";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {createRole, getRolesByCategoryId} from "../../api/role.ts";
import {SelectCategory} from "./SelectCategory.tsx";
import {CreateRoleForm} from "./CreateRoleForm.tsx";
import {RoleTable} from "./RoleTable.tsx";
import type {Role} from "../../model/role.ts";
import type {RoleCategory} from "../../model/roleCategory.ts";

export const RolePage = () => {
    const [currentCategory, setCurrentCategory] = useState<RoleCategory | undefined>(undefined)

    const queryClient = useQueryClient();
    const {data: categoryRoles} = useQuery({
        queryKey: ['roles', currentCategory?.id],
        queryFn: () => getRolesByCategoryId(currentCategory!.id!),
        enabled: !!currentCategory?.id,
    })
    const rolesMutation = useMutation({
        mutationFn: createRole,
        onSuccess: (role: Role) => {
            queryClient.setQueryData<Role[]>(['roles', currentCategory?.id], (oldRoles) => {
                return [...(oldRoles ?? []), role];
            })
        }
    })

    return <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        <Typography variant="h3" gutterBottom>
            Roles
        </Typography>
        <Paper sx={{p: 3, mb: 3}}>
            <SelectCategory currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}/>
            {currentCategory && <>
                <CreateRoleForm currentCategory={currentCategory} createRole={rolesMutation.mutate}/>
                <RoleTable categoryRoles={categoryRoles}/>
            </>}
        </Paper>
    </Container>
}