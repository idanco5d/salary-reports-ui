import type {FieldInputProps} from "./FieldInputProps.ts";
import {Box, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {getRolesByCategoryId} from "../../../api/role.ts";

export type RoleInputProps = FieldInputProps & {
    selectedCategoryId: string | undefined;
}

export const RoleInput = ({newSalary, setNewSalary, selectedCategoryId}: RoleInputProps) => {
    const { data: roles } = useQuery({
        queryKey: ['roles', selectedCategoryId],
        queryFn: () => getRolesByCategoryId(selectedCategoryId!),
        enabled: !!selectedCategoryId,
    });

    return <Box>
        <Typography variant="subtitle1" gutterBottom>
            Role
        </Typography>
        <FormControl fullWidth disabled={!selectedCategoryId}>
            <InputLabel>Select Role</InputLabel>
            <Select
                value={newSalary.roleId}
                label="Select Role"
                onChange={(e) => setNewSalary({...newSalary, roleId: e.target.value})}
            >
                {roles && roles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                        {role.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </Box>
}