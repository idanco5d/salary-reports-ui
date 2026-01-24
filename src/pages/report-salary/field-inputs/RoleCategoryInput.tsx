import type {FieldInputProps} from "./FieldInputProps.ts";
import {useQuery} from "@tanstack/react-query";
import {findAllCategories} from "../../../api/roleCategory.ts";
import {Box, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";

export type RoleCategoryInputProps = FieldInputProps & {
    selectedCategoryId: string | undefined;
    setSelectedCategoryId: (categoryId: string) => void;
}

export const RoleCategoryInput = ({
                                      newSalary,
                                      selectedCategoryId,
                                      setSelectedCategoryId,
                                      setNewSalary
                                  }: RoleCategoryInputProps) => {
    const {data: categories} = useQuery({
        queryKey: ['roleCategories'],
        queryFn: findAllCategories,
    });

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategoryId(categoryId);
        setNewSalary({...newSalary, roleId: ''});
    };

    return <Box>
        <Typography variant="subtitle1" gutterBottom>
            Role Category
        </Typography>
        <FormControl fullWidth>
            <InputLabel>Select Category</InputLabel>
            <Select
                value={selectedCategoryId}
                label="Select Category"
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
}