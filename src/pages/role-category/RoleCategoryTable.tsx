import type {RoleCategory} from "../../api/roleCategory.ts";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

export type ExistingCategoriesTableProps = {
    categories: RoleCategory[] | undefined;
}

export const RoleCategoryTable = ({categories}: ExistingCategoriesTableProps) => {
    return <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell><strong>Existing Categories</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {categories && categories.map((category) => (
                    <TableRow key={category.id}>
                        <TableCell>{category.name}</TableCell>
                        <TableCell align="right">
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
}