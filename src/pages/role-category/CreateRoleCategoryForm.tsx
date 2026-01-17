import type {RoleCategory} from "../../api/roleCategory.ts";
import {useState} from "react";
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import type {UseMutateFunction} from "@tanstack/react-query";

export type CreateRoleCategoryFormProps = {
    createCategory: UseMutateFunction<RoleCategory, Error, RoleCategory>
}

export const CreateRoleCategoryForm = ({createCategory}: CreateRoleCategoryFormProps) => {
    const [newCategory, setNewCategory] = useState<RoleCategory>({name: ''});

    const handleCreate = async () => {
        createCategory(newCategory);
        setNewCategory({name: ''});
    };

    return <Paper sx={{p: 3, mb: 3}}>
        <Typography variant="h6" gutterBottom>
            Create New Category
        </Typography>
        <Box sx={{display: 'flex', gap: 2, flexDirection: 'column'}}>
            <TextField
                label="Category Name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({name: e.target.value})}
                fullWidth
            />
            <Button
                variant="contained"
                onClick={handleCreate}
                sx={{alignSelf: 'center'}}
            >
                Create Category
            </Button>
        </Box>
    </Paper>
}