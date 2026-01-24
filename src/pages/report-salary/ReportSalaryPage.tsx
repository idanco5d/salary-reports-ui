import {Container, Paper, Stack, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {validateSalary} from "./ValidateSalary.ts";
import {RoleCategoryInput} from "./field-inputs/RoleCategoryInput.tsx";
import {RoleInput} from "./field-inputs/RoleInput.tsx";
import {EducationInput} from "./field-inputs/EducationInput.tsx";
import {EducationInRelevantFieldInput} from "./field-inputs/EducationInRelevantFIeldInput.tsx";
import {EmployerTypeInput} from "./field-inputs/EmployerTypeInput.tsx";
import {YearInput} from "./field-inputs/YearInput.tsx";
import {SubmitButton} from "./field-inputs/SubmitButton.tsx";
import {NumericInput} from "./field-inputs/NumericInput.tsx";
import {type CreateSalaryDto, getDefaultSalary} from "../../model/salary.ts";

export const ReportSalaryPage = () => {
    const [newSalary, setNewSalary] = useState<CreateSalaryDto>(getDefaultSalary());
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        setErrors(validateSalary(newSalary));
    }, [newSalary])

    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Typography variant="h3" gutterBottom>
                Report Salary Anonymously
            </Typography>

            <Paper sx={{p: 3, mb: 3}}>
                <Stack spacing={3}>
                    <NumericInput
                        title="Monthly Base Salary (ILS)"
                        label="Base Salary"
                        field="baseSalary"
                        newSalary={newSalary}
                        setNewSalary={setNewSalary}
                        error={errors.baseSalary}
                    />
                    <NumericInput
                        title="Monthly Extras (ILS: RSU, bonuses, travel reimbursement, etc.)"
                        label="Extras"
                        field="extras"
                        newSalary={newSalary}
                        setNewSalary={setNewSalary}
                        error={errors.extras}
                    />
                    <RoleCategoryInput
                        newSalary={newSalary}
                        setNewSalary={setNewSalary}
                        selectedCategoryId={selectedCategoryId}
                        setSelectedCategoryId={setSelectedCategoryId}
                    />
                    <RoleInput
                        newSalary={newSalary}
                        setNewSalary={setNewSalary}
                        selectedCategoryId={selectedCategoryId}
                    />
                    <NumericInput
                        title="Years of Experience"
                        label="Years of Experience"
                        field="experienceYears"
                        newSalary={newSalary}
                        setNewSalary={setNewSalary}
                        error={errors.experienceYears}
                    />
                    <EducationInput newSalary={newSalary} setNewSalary={setNewSalary}/>
                    <EducationInRelevantFieldInput newSalary={newSalary} setNewSalary={setNewSalary}/>
                    <NumericInput
                        title="Annual Vacation Days"
                        label="Vacation Days"
                        field="vacationDays"
                        newSalary={newSalary}
                        setNewSalary={setNewSalary}
                        error={errors.vacationDays}
                    />
                    <EmployerTypeInput newSalary={newSalary} setNewSalary={setNewSalary}/>
                    <YearInput
                        label={"Start Year"}
                        field={"startYear"}
                        error={errors.startYear}
                        newSalary={newSalary}
                        setNewSalary={setNewSalary}
                    />
                    <YearInput
                        label={"End Year"}
                        field={"endYear"}
                        newSalary={newSalary}
                        setNewSalary={setNewSalary}
                        error={errors.endYear}
                    />
                    <SubmitButton
                        newSalary={newSalary}
                        setNewSalary={setNewSalary}
                        setSelectedCategoryId={setSelectedCategoryId}
                        salaryHasErrors={Object.keys(errors).length > 0}
                    />
                </Stack>
            </Paper>
        </Container>
    );
};