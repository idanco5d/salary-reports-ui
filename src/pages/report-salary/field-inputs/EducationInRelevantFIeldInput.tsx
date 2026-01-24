import type {FieldInputProps} from "./FieldInputProps.ts";
import {Box, Checkbox, FormControlLabel} from "@mui/material";

export const EducationInRelevantFieldInput = ({newSalary, setNewSalary}: FieldInputProps) => {
    return <Box>
        <FormControlLabel
            control={
                <Checkbox
                    checked={newSalary.educationInRelevantField}
                    onChange={(e) => setNewSalary({
                        ...newSalary,
                        educationInRelevantField: e.target.checked
                    })}
                />
            }
            label="Education in relevant field"
        />
    </Box>
}