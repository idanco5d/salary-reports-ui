import type {FieldInputProps} from "./FieldInputProps.ts";
import {Box, TextField, Typography} from "@mui/material";
import type {CreateSalaryDto} from "../../../api/salary.ts";

export type NumericInputProps = FieldInputProps & {
    title: string,
    label: string,
    field: keyof CreateSalaryDto,
}

export const NumericInput = ({ title, label, field, newSalary, setNewSalary, error }: NumericInputProps) => {
    return <Box>
        <Typography variant="subtitle1" gutterBottom>
            {title}
        </Typography>
        <TextField
            label={label}
            type="number"
            value={newSalary[field] as number}
            onChange={(e) => setNewSalary({...newSalary, [field]: Number(e.target.value)})}
            fullWidth
            error={!!error}
            helperText={error}
        />
    </Box>
}