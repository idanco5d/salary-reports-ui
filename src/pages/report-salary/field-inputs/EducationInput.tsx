import type {FieldInputProps} from "./FieldInputProps.ts";
import {Box, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {Education, type TypeOfEducation} from "../../../model/salary.ts";

export const EducationInput = ({newSalary, setNewSalary}: FieldInputProps) => {
    return <Box>
        <Typography variant="subtitle1" gutterBottom>
            Education Level
        </Typography>
        <FormControl fullWidth>
            <InputLabel>Education</InputLabel>
            <Select
                value={newSalary.education}
                label="Education"
                onChange={(e) => setNewSalary({...newSalary, education: e.target.value as TypeOfEducation})}
            >
                <MenuItem value={Education.NONE}>None</MenuItem>
                <MenuItem value={Education.HIGH_SCHOOL}>High School</MenuItem>
                <MenuItem value={Education.COURSE}>Course</MenuItem>
                <MenuItem value={Education.BACHELOR}>Bachelor's Degree</MenuItem>
                <MenuItem value={Education.MASTER}>Master's Degree</MenuItem>
                <MenuItem value={Education.PHD}>PhD</MenuItem>
            </Select>
        </FormControl>
    </Box>
}