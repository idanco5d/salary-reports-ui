import type {FieldInputProps} from "./FieldInputProps.ts";
import {Box, TextField, Typography} from "@mui/material";
import type {CreateSalaryDto} from "../../../api/salary.ts";

export type YearInputProps = FieldInputProps & {
    label: string;
    field: keyof CreateSalaryDto;
}

export const YearInput = ({
                              field, newSalary, setNewSalary, error, label
                          }: YearInputProps) => {
    return <Box>
        <Typography variant="subtitle1" gutterBottom>
            {`${label} (Optional)`}
        </Typography>
        <TextField
            label={label}
            type="number"
            value={newSalary[field] as number | undefined}
            onChange={(e) => setNewSalary({
                ...newSalary,
                [field]: e.target.value ? Number(e.target.value) : undefined
            })}
            fullWidth
            error={!!error}
            helperText={error}
        />
    </Box>
}