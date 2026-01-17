import {findAllCategories, type RoleCategory} from "../../api/roleCategory.ts";
import {MenuItem, OutlinedInput, Select, Stack, Typography} from "@mui/material";
import {useQuery} from "@tanstack/react-query";

export type SelectCategoryProps = {
    currentCategory: RoleCategory | undefined;
    setCurrentCategory: (category: RoleCategory) => void;
}

export const SelectCategory = ({currentCategory, setCurrentCategory}: SelectCategoryProps) => {
    const {data: roleCategories} = useQuery({
        queryKey: ['roleCategories'],
        queryFn: findAllCategories,
    })
    const onChangeCategory = (roleCategoryId: string) => {
        const roleCategory = roleCategories?.find((category) => category.id === roleCategoryId);
        if (roleCategory) {
            setCurrentCategory(roleCategory);
        }
    }

    return <Stack direction="row" spacing={2} style={{alignItems: "center", marginBottom: 12}}>
        <Typography variant="h6" gutterBottom>
            Role Category:
        </Typography>
        <Select variant="standard"
                onChange={(e) => onChangeCategory(e.target.value)}
                value={currentCategory?.id}
                input={<OutlinedInput/>}>
            {roleCategories?.map((category) =>
                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
            )}
        </Select>
    </Stack>
}