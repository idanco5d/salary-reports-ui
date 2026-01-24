import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

import type {Role} from "../../model/role.ts";

export type RoleTableProps = {
    categoryRoles: Role[] | undefined;
}

export const RoleTable = ({categoryRoles}: RoleTableProps) => {
    return <TableContainer component={Paper} sx={{mt: 2}} data-testid="role-table">
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell><strong>Existing Category Roles</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {categoryRoles && categoryRoles.map((category) => (
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