import type {FieldInputProps} from "./FieldInputProps.ts";
import {Box, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {EmployerType, type TypeOfEmployerType} from "../../../model/salary.ts";

export const EmployerTypeInput = ({newSalary, setNewSalary}: FieldInputProps) => {
    return <Box>
        <Typography variant="subtitle1" gutterBottom>
            Employer Type
        </Typography>
        <FormControl fullWidth>
            <InputLabel>Employer Type</InputLabel>
            <Select
                value={newSalary.employerType}
                label="Employer Type"
                onChange={(e) => setNewSalary({
                    ...newSalary,
                    employerType: e.target.value as TypeOfEmployerType
                })}
            >
                <MenuItem value={EmployerType.INTERNATIONAL_TECH_CORP}>International Tech
                    Corporation</MenuItem>
                <MenuItem value={EmployerType.ISRAELI_TECH_CORP}>Israeli Tech Corporation</MenuItem>
                <MenuItem value={EmployerType.SMALL_STARTUP}>Small Startup (1-19 employees)</MenuItem>
                <MenuItem value={EmployerType.MEDIUM_STARTUP}>Medium Startup (20-100
                    employees)</MenuItem>
                <MenuItem value={EmployerType.LARGE_STARTUP}>Large Startup (over 100
                    employees)</MenuItem>
                <MenuItem value={EmployerType.DEFENSE_CORP}>Defense Corporation</MenuItem>
                <MenuItem value={EmployerType.INTERNATIONAL_NONTECH_CORP}>International Non-Tech
                    Corporation</MenuItem>
                <MenuItem value={EmployerType.ISRAELI_NONTECH_CORP}>Israeli Non-Tech
                    Corporation</MenuItem>
                <MenuItem value={EmployerType.OTHER}>Other</MenuItem>
            </Select>
        </FormControl>
    </Box>
}