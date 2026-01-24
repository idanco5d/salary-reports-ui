import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Container, Typography} from '@mui/material';
import {createRoleCategory, findAllCategories} from '../../api/roleCategory.ts';
import {CreateRoleCategoryForm} from "./CreateRoleCategoryForm.tsx";
import {RoleCategoryTable} from "./RoleCategoryTable.tsx";
import type {RoleCategory} from "../../model/roleCategory.ts";

export const RoleCategoryPage = () => {
    const queryClient = useQueryClient();
    const {data: existingCategories} = useQuery({
        queryKey: ['roleCategories'],
        queryFn: findAllCategories,
    });
    const roleCategoryMutation = useMutation({
        mutationFn: createRoleCategory,
        onSuccess: (newCategory) => {
            queryClient.setQueryData<RoleCategory[]>(['roleCategories'], (oldCategories) => {
                return [...(oldCategories || []), newCategory];
            })
        }
    });

    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Typography variant="h4" gutterBottom>
                Role Categories
            </Typography>
            <CreateRoleCategoryForm createCategory={roleCategoryMutation.mutate}/>
            <RoleCategoryTable categories={existingCategories}/>
        </Container>
    );
}