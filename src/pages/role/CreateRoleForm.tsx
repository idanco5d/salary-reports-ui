import {Box, Button, TextField, Typography} from "@mui/material";
import {useState} from "react";
import type {UseMutateFunction} from "@tanstack/react-query";
import type {Role} from "../../model/role.ts";
import type {RoleCategory} from "../../model/roleCategory.ts";

export type CreateRoleFormProps = {
    currentCategory: RoleCategory;
    createRole: UseMutateFunction<Role, Error, Role>;
}

export const CreateRoleForm = ({currentCategory, createRole}: CreateRoleFormProps) => {
    const [newRole, setNewRole] = useState<Role | undefined>(undefined)

    const handleCreate = async () => {
        if (!newRole) return;
        createRole({...newRole});
        setNewRole({name: '', roleCategory: currentCategory});
    };

    return <div style={{ marginTop: 7, marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>
            Create New Role
        </Typography>
        <Box sx={{display: 'flex', gap: 2, flexDirection: 'column'}}>
            <TextField
                label="Role Name"
                value={newRole?.name}
                disabled={!currentCategory}
                onChange={(e) => setNewRole({name: e.target.value, roleCategory: currentCategory ?? {name: ''}})}
                fullWidth
            />
            <Button
                variant="contained"
                onClick={handleCreate}
                sx={{alignSelf: 'center'}}
            >
                Create Role
            </Button>
        </Box>
    </div>
}