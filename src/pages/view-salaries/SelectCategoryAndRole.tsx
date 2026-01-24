import {Box, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography} from "@mui/material";
import {findAllCategories} from "../../api/roleCategory.ts";
import {useQuery} from "@tanstack/react-query";
import type {Role} from "../../model/role.ts";

export type SelectRoleAndCategoryProps = {
    selectedCategoryId: string | undefined;
    handleCategoryChange: (categoryId: string) => void;
    roles: Role[] | undefined;
    selectedRoleId: string | undefined;
    setSelectedRoleId: (roleId: string) => void;
}

export const SelectCategoryAndRole = ({
                                          selectedCategoryId,
                                          handleCategoryChange,
                                          roles,
                                          selectedRoleId,
                                          setSelectedRoleId
                                      }: SelectRoleAndCategoryProps) => {
    const {data: categories} = useQuery({
        queryKey: ['roleCategories'],
        queryFn: findAllCategories,
    })

    return <Paper sx={{p: 3, mb: 3}}>
        <Stack spacing={3}>
            <Box>
                <Typography variant="subtitle1" gutterBottom>
                    Select Role Category
                </Typography>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={selectedCategoryId}
                        label="Category"
                        onChange={(e) => handleCategoryChange(e.target.value)}
                    >
                        {categories && categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Box>
                <Typography variant="subtitle1" gutterBottom>
                    Select Role
                </Typography>
                <FormControl fullWidth disabled={!selectedCategoryId}>
                    <InputLabel>Role</InputLabel>
                    <Select
                        value={selectedRoleId}
                        label="Role"
                        onChange={(e) => setSelectedRoleId(e.target.value)}
                    >
                        {roles && roles.map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                                {role.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Stack>
    </Paper>
}